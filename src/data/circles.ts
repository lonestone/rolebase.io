import { nanoid } from 'nanoid'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { FirebaseHookReturn, firestore } from './firebase'

export interface Circle {
  roleId: string
  parentId: string | null
  members: CircleMemberEntry[]
}

export interface CircleEntry extends Circle {
  id: string
}

export type CircleCreate = Circle
export type CircleUpdate = Partial<Circle>

// Circle member
export interface CircleMember {
  memberId: string
}

export interface CircleMemberEntry extends CircleMember {
  id: string
}

const collection = firestore.collection('circles')

export function useCircles(): FirebaseHookReturn<CircleEntry[]> {
  return useCollectionData<CircleEntry>(collection, { idField: 'id' })
}

export function useCircle(id: string): FirebaseHookReturn<CircleEntry> {
  return useDocumentData(collection.doc(id), { idField: 'id' })
}

export async function createCircle(roleId: string, parentId: string | null) {
  const circle: Circle = {
    roleId,
    parentId,
    members: [],
  }
  await collection.add(circle)
}

export async function updateCircle(id: string, data: CircleUpdate) {
  await collection.doc(id).set(data, { merge: true })
}

export async function deleteCircle(id: string) {
  await collection.doc(id).delete()
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

export async function addMemberToCircle(
  memberId: string,
  circleId: string
): Promise<boolean> {
  const doc = collection.doc(circleId)
  const snapshot = await doc.get()
  if (!snapshot.exists) return false
  const circle = snapshot.data() as Circle

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

export async function moveCircleMember(
  memberId: string,
  parentCircleId: string,
  targetCircleId: string | null
): Promise<boolean> {
  const doc = collection.doc(parentCircleId)
  const snapshot = await doc.get()
  if (!snapshot.exists) return false
  const circle = snapshot.data() as Circle

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
  if (!targetSnapshot.exists) return false
  const targetCircle = targetSnapshot.data() as Circle

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
