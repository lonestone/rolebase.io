import { Circle } from '@shared/circle'
import { Optional } from '@shared/types'
import {
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  WriteBatch,
  writeBatch,
} from 'firebase/firestore'
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
  subscribeQuery(query(collection, where('orgId', '==', orgId)))
)

export async function deleteCircle(id: string): Promise<boolean> {
  try {
    const batch = writeBatch(firestore)
    await deleteCircleInternal(id, batch)
    await batch.commit()
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
export async function deleteCircleInternal(id: string, batch: WriteBatch) {
  const circleDoc = doc(collection, id)
  const snapshot = await getDoc(circleDoc)
  const circle = snapshot.data()
  if (!circle) return

  // Delete circle
  batch.delete(circleDoc)

  // Delete role?
  if (circle) {
    const roleDoc = doc(rolesCollection, circle.roleId)
    const roleSnapshot = await getDoc(roleDoc)
    const role = roleSnapshot.data()
    if (role && !role.base) {
      batch.delete(roleDoc)
    }
  }

  // Delete sub-circles
  const subCircles = await getDocs(
    query(
      collection,
      where('orgId', '==', circle.orgId),
      where('parentId', '==', id)
    )
  )
  for (const queryDocumentSnapshot of subCircles.docs) {
    await deleteCircleInternal(queryDocumentSnapshot.id, batch)
  }
}

// Change parent circle
export async function moveCircle(
  circleId: string,
  targetCircleId: string | null
): Promise<boolean> {
  const circleDoc = doc(collection, circleId)
  const snapshot = await getDoc(circleDoc)
  if (!snapshot.exists) return false
  updateDoc(circleDoc, { parentId: targetCircleId })
  return true
}

export async function copyCircle(
  circleId: string,
  targetCircleId: string | null
): Promise<boolean> {
  try {
    const batch = writeBatch(firestore)
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
  batch: WriteBatch
): Promise<void> {
  const circleDoc = doc(collection, circleId)
  const snapshot = await getDoc(circleDoc)
  const circle = snapshot.data()
  if (!circle) throw new Error(`Circle not found: ${circleId}`)

  let roleId = circle.roleId

  // Copy role?
  const roleDoc = doc(rolesCollection, circle.roleId)
  const roleSnapshot = await getDoc(roleDoc)
  const role = roleSnapshot.data()
  if (role && !role.base) {
    const newRoleDoc = doc(rolesCollection)
    batch.set(newRoleDoc, role)
    roleId = newRoleDoc.id
  }

  // Create new circle
  const newCircle: Circle = {
    ...circle,
    parentId: targetCircleId,
    roleId,
  }
  const newCircleDoc = doc(collection)
  batch.set(newCircleDoc, newCircle)

  // Create sub-circles
  const subCircles = await getDocs(
    query(
      collection,
      where('orgId', '==', circle.orgId),
      where('parentId', '==', circleId)
    )
  )
  for (const queryDocumentSnapshot of subCircles.docs) {
    await copyCircleInternal(queryDocumentSnapshot.id, newCircleDoc.id, batch)
  }
}

export async function addMemberToCircle(
  memberId: string,
  circleId: string
): Promise<boolean> {
  const circleDoc = doc(collection, circleId)
  const snapshot = await getDoc(circleDoc)
  const circle = snapshot.data()
  if (!circle) return false

  // Member is already in circle
  if (circle.members.some((member) => member.memberId === memberId)) {
    return true
  }

  // Add to members list
  updateDoc(circleDoc, {
    members: arrayUnion({
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
  const circleDoc = doc(collection, parentCircleId)
  const snapshot = await getDoc(circleDoc)
  const circle = snapshot.data()
  if (!circle) return false

  if (targetCircleId === null) {
    // Remove member from circle
    updateDoc(circleDoc, {
      members: circle.members.filter((member) => member.memberId !== memberId),
    })
    return true
  }

  const targetDoc = doc(collection, targetCircleId)
  const targetSnapshot = await getDoc(targetDoc)
  const targetCircle = targetSnapshot.data()
  if (!targetCircle) return false

  const entry = circle.members.find((member) => member.memberId === memberId)
  if (!entry) return false

  // Member is not already in target circle
  if (!targetCircle.members.some((member) => member.memberId === memberId)) {
    // Add member to target circle
    updateDoc(targetDoc, {
      members: arrayUnion(entry),
    })
  }

  // Remove member from its circle
  updateDoc(circleDoc, {
    members: circle.members.filter((member) => member.memberId !== memberId),
  })
  return true
}
