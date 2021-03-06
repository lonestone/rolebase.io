import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import * as yup from 'yup'
import { getCollection, storage } from '../firebase'
import { createDataHooks } from '../hooks'
import { nameSchema } from '../schemas'

export interface Member {
  name: string
  picture?: string | null
}

export type MemberEntry = Data<Member, 'id', 'id'>
export type MemberCreate = Member
export type MemberUpdate = Partial<Member>

const collection = getCollection<Member>('members')

// React hooks
const hooks = createDataHooks<Member, MemberEntry>(collection)
export const useMembers = hooks.useCollection
export const useMember = hooks.useDocument
export const useContextMembers = hooks.useContextCollection
export const useContextMember = hooks.useContextDocument
export const MembersProvider = hooks.Provider

export async function createMember(
  name: string
): Promise<MemberEntry | undefined> {
  const member: Member = {
    name,
  }
  const doc = await collection.add(member)
  const snapshot = await doc.get()
  return { ...snapshot.data(), id: doc.id } as MemberEntry | undefined
}

export async function updateMember(id: string, data: MemberUpdate) {
  await collection.doc(id).set(data, { merge: true })
}

export async function deleteMember(id: string) {
  await collection.doc(id).delete()
}

export const memberCreateSchema = yup.object().shape({
  name: nameSchema,
})

export const memberUpdateSchema = yup.object().shape({
  name: nameSchema,
})

// Upload member picture and return URL
export async function uploadPicture(
  memberId: string,
  file: File
): Promise<string> {
  const extension = file.name.match(/(\.[a-z]+)$/i)?.[0] || ''
  const snapshot = await storage
    .ref()
    .child(`members/${memberId}${extension}`)
    .put(file)
  return snapshot.ref.getDownloadURL()
}
