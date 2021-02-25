import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import * as yup from 'yup'
import { FirebaseHookReturn, firestore } from './firebase'

export interface Member {
  name: string
}

export interface MemberEntry extends Member {
  id: string
}

export type MemberCreate = Member
export type MemberUpdate = Partial<Member>

const collection = firestore.collection('members')

export function useMembers(): FirebaseHookReturn<MemberEntry[]> {
  return useCollectionData<MemberEntry>(collection, { idField: 'id' })
}

export function useMember(id: string): FirebaseHookReturn<MemberEntry> {
  return useDocumentData(collection.doc(id), { idField: 'id' })
}

export async function createMember(name: string) {
  const member: Member = {
    name,
  }
  await collection.add(member)
}

export async function updateMember(id: string, data: MemberUpdate) {
  await collection.doc(id).set(data, { merge: true })
}

export async function deleteMember(id: string) {
  await collection.doc(id).delete()
}

const name = yup.string().required().min(3)

export const memberCreateSchema = yup.object().shape({
  name,
})

export const memberUpdateSchema = yup.object().shape({
  name,
})
