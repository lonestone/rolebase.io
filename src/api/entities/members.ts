import * as yup from 'yup'
import { getCollection, storage } from '../firebase'
import { nameSchema } from '../schemas'

export interface Member {
  name: string
  picture?: string | null
}

export type MemberEntry = Member & { id: string }
export type MemberCreate = Member
export type MemberUpdate = Partial<Member>

const collection = getCollection<Member>('members')

export function subscribeMembers(
  orgId: string,
  onData: (members: MemberEntry[]) => void,
  onError: (error: Error) => void
): () => void {
  return collection.onSnapshot((querySnapshot) => {
    const entries = querySnapshot.docs.map((snapshot) => ({
      id: snapshot.id,
      ...snapshot.data(),
    }))

    // Sort entries by name
    entries.sort((a, b) => ((a.name || '') < (b.name || '') ? -1 : 1))

    onData(entries)
  }, onError)
}

export async function createMember(name: string): Promise<MemberEntry> {
  const member: Member = {
    name,
  }
  const doc = await collection.add(member)
  const snapshot = await doc.get()
  return { ...snapshot.data()!, id: doc.id }
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
