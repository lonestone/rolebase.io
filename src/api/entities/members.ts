import { Member } from '@shared/member'
import memoize from 'memoizee'
import * as yup from 'yup'
import {
  executeQuery,
  functions,
  getCollection,
  getEntityMethods,
  storage,
  subscribeQuery,
} from '../firebase'
import { nameSchema } from '../schemas'

const collection = getCollection<Member>('members')

const methods = getEntityMethods(collection)
export const createMember = methods.create
export const updateMember = methods.update
export const deleteMember = methods.delete

export const subscribeMembers = memoize((orgId: string) =>
  subscribeQuery(collection.where('orgId', '==', orgId).orderBy('name'))
)

export async function getMembers(orgId: string) {
  return executeQuery(collection.where('orgId', '==', orgId).orderBy('name'))
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
