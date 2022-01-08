import { Circle } from '@shared/circle'
import { Optional } from '@shared/types'
import { nanoid } from 'nanoid'
import { memoize } from 'src/memoize'
import {
  firestore,
  getCollection,
  getEntityMethods,
  subscribeQuery,
} from '../firebase'
import { collection as rolesCollection } from './roles'

export const collection = getCollection<Circle>('circles')

const methods = getEntityMethods(collection, {
  createTransform: (circle: Optional<Circle, 'members'>) => ({
    members: [],
    ...circle,
  }),
})
export const createCircle = methods.create
export const updateCircle = methods.update

export const subscribeCircles = memoize((orgId: string) =>
  subscribeQuery(collection.where('orgId', '==', orgId))
)

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
  doc.update({ parentId: targetCircleId })
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
  doc.update({
    members: circle.members.concat({
      id: nanoid(10),
      memberId,
    }),
  })
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
    doc.update({
      members: circle.members.filter((member) => member.memberId !== memberId),
    })
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
    targetDoc.update({
      members: targetCircle.members.concat(entry),
    })
  }

  // Remove member from its circle
  doc.update({
    members: circle.members.filter((member) => member.memberId !== memberId),
  })
  return true
}
