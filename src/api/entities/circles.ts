import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { subscribeQuery } from '@api/helpers/subscribeQuery'
import { Circle } from '@shared/model/circle'
import { EntitiesChanges, EntityChangeType } from '@shared/model/log'
import { Optional } from '@shared/model/types'
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
import { firestore } from '../firebase'
import { collection as rolesCollection } from './roles'

export const collection = getCollection<Circle>('circles')

const methods = getEntityMethods(collection, {
  createTransform: (circle: Optional<Circle, 'archived' | 'members'>) => ({
    archived: false,
    members: [],
    ...circle,
  }),
})
export const getCircle = methods.get
export const createCircle = methods.create
export const updateCircle = methods.update

export const subscribeCircles = memoize((orgId: string, archived: boolean) =>
  subscribeQuery(
    query(
      collection,
      where('orgId', '==', orgId),
      where('archived', '==', archived)
    )
  )
)

export async function archiveCircle(id: string): Promise<EntitiesChanges> {
  const changes: EntitiesChanges = { circles: [], roles: [] }
  try {
    const batch = writeBatch(firestore)
    await archiveCircleInternal(id, batch, changes)
    await batch.commit()
  } catch (error) {
    console.error(error)
  }
  return changes
}
async function archiveCircleInternal(
  id: string,
  batch: WriteBatch,
  changes: EntitiesChanges
): Promise<void> {
  const circleDoc = doc(collection, id)
  const snapshot = await getDoc(circleDoc)
  const circle = snapshot.data()
  if (!circle) return

  // Archive circle
  if (!circle.archived) {
    batch.update(circleDoc, { archived: true })
    changes.circles?.push({
      type: EntityChangeType.Update,
      id: circleDoc.id,
      prevData: { archived: false },
      newData: { archived: true },
    })
  }

  // Archive role?
  if (circle) {
    const roleDoc = doc(rolesCollection, circle.roleId)
    const roleSnapshot = await getDoc(roleDoc)
    const role = roleSnapshot.data()
    if (role && !role.base && !role.archived) {
      batch.update(roleDoc, { archived: true })
      changes.roles?.push({
        type: EntityChangeType.Update,
        id: roleDoc.id,
        prevData: { archived: false },
        newData: { archived: true },
      })
    }
  }

  // Archive sub-circles
  const subCircles = await getDocs(
    query(
      collection,
      where('orgId', '==', circle.orgId),
      where('parentId', '==', id)
    )
  )
  for (const queryDocumentSnapshot of subCircles.docs) {
    await archiveCircleInternal(queryDocumentSnapshot.id, batch, changes)
  }
}

// Change parent circle
export async function moveCircle(
  circleId: string,
  targetCircleId: string | null
): Promise<EntitiesChanges> {
  const changes: EntitiesChanges = { circles: [] }
  const circleDoc = doc(collection, circleId)
  const snapshot = await getDoc(circleDoc)
  const circle = snapshot.data()
  if (!circle) return changes

  updateDoc(circleDoc, { parentId: targetCircleId })

  changes.circles?.push({
    type: EntityChangeType.Update,
    id: circleDoc.id,
    prevData: { parentId: circle.parentId },
    newData: { parentId: targetCircleId },
  })
  return changes
}

export async function copyCircle(
  circleId: string,
  targetCircleId: string | null
): Promise<EntitiesChanges> {
  const changes: EntitiesChanges = { circles: [], roles: [] }
  try {
    const batch = writeBatch(firestore)
    await copyCircleInternal(circleId, targetCircleId, batch, changes)
    await batch.commit()
  } catch (error) {
    console.error(error)
  }
  return changes
}

async function copyCircleInternal(
  circleId: string,
  targetCircleId: string | null,
  batch: WriteBatch,
  changes: EntitiesChanges
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

    changes.roles?.push({
      type: EntityChangeType.Create,
      id: roleId,
      data: role,
    })
  }

  // Create new circle
  const newCircle: Circle = {
    ...circle,
    parentId: targetCircleId,
    roleId,
  }
  const newCircleDoc = doc(collection)
  batch.set(newCircleDoc, newCircle)

  changes.circles?.push({
    type: EntityChangeType.Create,
    id: newCircleDoc.id,
    data: newCircle,
  })

  // Create sub-circles
  const subCircles = await getDocs(
    query(
      collection,
      where('orgId', '==', circle.orgId),
      where('parentId', '==', circleId)
    )
  )
  for (const queryDocumentSnapshot of subCircles.docs) {
    await copyCircleInternal(
      queryDocumentSnapshot.id,
      newCircleDoc.id,
      batch,
      changes
    )
  }
}

export async function addMemberToCircle(
  memberId: string,
  circleId: string
): Promise<EntitiesChanges> {
  const changes: EntitiesChanges = { circles: [] }
  const circleDoc = doc(collection, circleId)
  const snapshot = await getDoc(circleDoc)
  const circle = snapshot.data()
  if (!circle) return changes

  // Member is already in circle
  if (circle.members.some((member) => member.memberId === memberId)) {
    return changes
  }

  // Add to members list
  const circleMemberId = nanoid(10)
  updateDoc(circleDoc, {
    members: arrayUnion({
      id: circleMemberId,
      memberId,
    }),
  })

  changes.circles?.push({
    type: EntityChangeType.Update,
    id: circleDoc.id,
    prevData: { members: circle.members },
    newData: { members: [...circle.members, { id: circleMemberId, memberId }] },
  })
  return changes
}

export async function removeCircleMember(
  memberId: string,
  parentCircleId: string
): Promise<EntitiesChanges> {
  return moveCircleMember(memberId, parentCircleId, null)
}

export async function moveCircleMember(
  memberId: string,
  parentCircleId: string,
  targetCircleId: string | null
): Promise<EntitiesChanges> {
  const changes: EntitiesChanges = { circles: [] }
  const circleDoc = doc(collection, parentCircleId)
  const snapshot = await getDoc(circleDoc)
  const circle = snapshot.data()
  if (!circle) return changes

  if (targetCircleId === null) {
    // Remove member from circle
    const newMembers = circle.members.filter(
      (member) => member.memberId !== memberId
    )
    updateDoc(circleDoc, {
      members: newMembers,
    })
    changes.circles?.push({
      type: EntityChangeType.Update,
      id: circleDoc.id,
      prevData: { members: circle.members },
      newData: { members: newMembers },
    })
    return changes
  }

  const targetDoc = doc(collection, targetCircleId)
  const targetSnapshot = await getDoc(targetDoc)
  const targetCircle = targetSnapshot.data()
  if (!targetCircle) return changes

  const circleMember = circle.members.find(
    (member) => member.memberId === memberId
  )
  if (!circleMember) return changes

  // Member is not already in target circle
  if (!targetCircle.members.some((member) => member.memberId === memberId)) {
    // Add member to target circle
    const newMembers = targetCircle.members.concat(circleMember)
    updateDoc(targetDoc, {
      members: newMembers,
    })
    changes.circles?.push({
      type: EntityChangeType.Update,
      id: targetDoc.id,
      prevData: { members: targetCircle.members },
      newData: { members: newMembers },
    })
  }

  // Remove member from its circle
  const newMembers = circle.members.filter(
    (member) => member.memberId !== memberId
  )
  updateDoc(circleDoc, {
    members: newMembers,
  })
  changes.circles?.push({
    type: EntityChangeType.Update,
    id: circleDoc.id,
    prevData: { members: circle.members },
    newData: { members: newMembers },
  })
  return changes
}
