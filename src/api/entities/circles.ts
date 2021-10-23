import { nanoid } from 'nanoid'
import { firestore, getCollection, snapshotQuery } from '../firebase'
import { RoleEntry, collection as rolesCollection, Role } from './roles'

export interface Circle {
  orgId: string
  roleId: string
  parentId: string | null
  members: CircleMemberEntry[]
}

export type CircleEntry = Circle & { id: string }
export type CircleCreate = Circle
export type CircleUpdate = Partial<Circle>

export interface CircleWithRoleEntry extends CircleEntry {
  role?: RoleEntry
}

// Circle member
export interface CircleMember {
  memberId: string
  avgMinPerWeek?: number | null
}

export interface CircleMemberEntry extends CircleMember {
  id: string
}

const collection = getCollection<Circle>('circles')

export function subscribeCircles(
  orgId: string,
  onData: (circles: CircleEntry[]) => void,
  onError: (error: Error) => void
): () => void {
  return snapshotQuery(collection.where('orgId', '==', orgId), onData, onError)
}

export async function createCircle(
  orgId: string,
  roleId: string,
  parentId: string | null
): Promise<CircleEntry> {
  const circle: Circle = {
    orgId,
    roleId,
    parentId,
    members: [],
  }
  const doc = await collection.add(circle)
  const snapshot = await doc.get()
  return { ...snapshot.data()!, id: doc.id }
}

export async function updateCircle(id: string, data: CircleUpdate) {
  await collection.doc(id).set(data, { merge: true })
}

export async function deleteCircle(id: string): Promise<boolean> {
  try {
    const batch = firestore.batch()
    await deleteCircleInternal(id, batch)
    await batch.commit()
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
export async function deleteCircleInternal(
  id: string,
  batch: firebase.default.firestore.WriteBatch
) {
  const doc = collection.doc(id)
  const snapshot = await doc.get()
  const circle = snapshot.data()
  if (!circle) return

  // Delete circle
  batch.delete(doc)

  // Delete role?
  if (circle) {
    const roleDoc = rolesCollection.doc(circle.roleId)
    const roleSnapshot = await roleDoc.get()
    const role = roleSnapshot.data()
    if (role && !role.base) {
      batch.delete(roleDoc)
    }
  }

  // Delete sub-circles
  const subCircles = await collection
    .where('orgId', '==', circle.orgId)
    .where('parentId', '==', id)
    .get()
  for (const queryDocumentSnapshot of subCircles.docs) {
    await deleteCircleInternal(queryDocumentSnapshot.id, batch)
  }
}

// Change parent circle
export async function moveCircle(
  circleId: string,
  targetCircleId: string | null
): Promise<boolean> {
  const doc = collection.doc(circleId)
  const snapshot = await doc.get()
  if (!snapshot.exists) return false
  doc.set({ parentId: targetCircleId }, { merge: true })
  return true
}

export async function copyCircle(
  circleId: string,
  targetCircleId: string | null
): Promise<boolean> {
  try {
    const batch = firestore.batch()
    await copyCircleInternal(circleId, targetCircleId, batch)
    await batch.commit()
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

async function copyCircleInternal(
  circleId: string,
  targetCircleId: string | null,
  batch: firebase.default.firestore.WriteBatch
): Promise<void> {
  const doc = collection.doc(circleId)
  const snapshot = await doc.get()
  const circle = snapshot.data()
  if (!circle) throw new Error(`Circle not found: ${circleId}`)

  let roleId = circle.roleId

  // Copy role?
  const roleDoc = rolesCollection.doc(circle.roleId)
  const roleSnapshot = await roleDoc.get()
  const role = roleSnapshot.data()
  if (role && !role.base) {
    const newRoleDoc = rolesCollection.doc()
    batch.set(newRoleDoc, role)
    roleId = newRoleDoc.id
  }

  // Create new circle
  const newCircle: Circle = {
    ...circle,
    parentId: targetCircleId,
    roleId,
  }
  const newCircleDoc = collection.doc()
  batch.set(newCircleDoc, newCircle)

  // Create sub-circles
  const subCircles = await collection
    .where('orgId', '==', circle.orgId)
    .where('parentId', '==', circleId)
    .get()
  for (const queryDocumentSnapshot of subCircles.docs) {
    await copyCircleInternal(queryDocumentSnapshot.id, newCircleDoc.id, batch)
  }
}

export async function addMemberToCircle(
  memberId: string,
  circleId: string
): Promise<boolean> {
  const doc = collection.doc(circleId)
  const snapshot = await doc.get()
  const circle = snapshot.data()
  if (!circle) return false

  // Member is already in circle
  if (circle.members.some((member) => member.memberId === memberId)) {
    return true
  }

  // Add to members list
  doc.set(
    {
      members: circle.members.concat({
        id: nanoid(10),
        memberId,
      }),
    },
    { merge: true }
  )
  return true
}

export async function removeCircleMember(
  memberId: string,
  parentCircleId: string
): Promise<boolean> {
  return moveCircleMember(memberId, parentCircleId, null)
}

export async function moveCircleMember(
  memberId: string,
  parentCircleId: string,
  targetCircleId: string | null
): Promise<boolean> {
  const doc = collection.doc(parentCircleId)
  const snapshot = await doc.get()
  const circle = snapshot.data()
  if (!circle) return false

  if (targetCircleId === null) {
    // Remove member from circle
    doc.set(
      {
        members: circle.members.filter(
          (member) => member.memberId !== memberId
        ),
      },
      { merge: true }
    )
    return true
  }

  const targetDoc = collection.doc(targetCircleId)
  const targetSnapshot = await targetDoc.get()
  const targetCircle = targetSnapshot.data()
  if (!targetCircle) return false

  const entry = circle.members.find((member) => member.memberId === memberId)
  if (!entry) return false

  // Member is not already in target circle
  if (!targetCircle.members.some((member) => member.memberId === memberId)) {
    // Add member to target circle
    targetDoc.set(
      {
        members: targetCircle.members.concat(entry),
      },
      { merge: true }
    )
  }

  // Remove member from its circle
  doc.set(
    {
      members: circle.members.filter((member) => member.memberId !== memberId),
    },
    { merge: true }
  )
  return true
}
