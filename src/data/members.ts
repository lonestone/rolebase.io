import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import * as yup from 'yup'
import { FirebaseHookReturn, getCollection, storage } from './firebase'
import { nameSchema } from './schemas'

export interface Member {
  name: string
  picture?: string | null
}

export interface MemberEntry extends Member {
  id: string
}

export type MemberCreate = Member
export type MemberUpdate = Partial<Member>

const collection = getCollection<Member>('members')

export function useMembers(): FirebaseHookReturn<MemberEntry[]> {
  const [data, loading, error] = useCollectionData<Member, 'id'>(collection, {
    idField: 'id',
  })
  return [data?.sort((a, b) => (a.name < b.name ? -1 : 1)), loading, error]
}

export function useMember(id: string): FirebaseHookReturn<MemberEntry> {
  return useDocumentData(collection.doc(id), { idField: 'id' })
}

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
