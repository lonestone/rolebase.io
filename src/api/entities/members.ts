import { Member, MemberEntry, MemberUpdate } from '@shared/members'
import * as yup from 'yup'
import { functions, getCollection, snapshotQuery, storage } from '../firebase'
import { nameSchema } from '../schemas'

const collection = getCollection<Member>('members')

export function subscribeMembers(
  orgId: string,
  onData: (members: MemberEntry[]) => void,
  onError: (error: Error) => void
): () => void {
  return snapshotQuery(
    collection.where('orgId', '==', orgId).orderBy('name'),
    onData,
    onError
  )
}

export async function getMembers(orgId: string): Promise<MemberEntry[]> {
  const querySnapshot = await collection.where('orgId', '==', orgId).get()
  return (
    querySnapshot.docs
      .map((snapshot) => ({
        id: snapshot.id,
        ...snapshot.data(),
      }))
      // Sort entries by name
      .sort((a, b) => ((a.name || '') < (b.name || '') ? -1 : 1))
  )
}

export async function createMember(member: Member): Promise<MemberEntry> {
  delete (member as any).id
  const doc = await collection.add(member)
  const snapshot = await doc.get()
  return { ...snapshot.data()!, id: doc.id }
}

export async function updateMember(id: string, data: MemberUpdate) {
  await collection.doc(id).update(data)
}

export async function deleteMember(id: string) {
  await collection.doc(id).delete()
}

export const memberCreateSchema = yup.object().shape({
  name: nameSchema,
})

export const memberUpdateSchema = yup.object().shape({
  name: nameSchema,
  workedMinPerWeek: yup.number().nullable(),
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

export async function inviteMember(
  memberId: string,
  email: string
): Promise<void> {
  await functions.httpsCallable('inviteMember')({
    memberId,
    email,
  })
}

export async function acceptMemberInvitation(
  memberId: string,
  token: string
): Promise<void> {
  await functions.httpsCallable('acceptMemberInvitation')({
    memberId,
    token,
  })
}
