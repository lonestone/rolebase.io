import { Member } from '@shared/member'
import { ClaimRole } from '@shared/userClaims'
import { orderBy, query, where } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { memoize } from 'src/memoize'
import {
  executeQuery,
  functions,
  getCollection,
  getEntityMethods,
  storage,
  subscribeQuery,
} from '../firebase'

export const collection = getCollection<Member>('members')

const methods = getEntityMethods(collection)
export const createMember = methods.create
export const updateMember = methods.update
export const deleteMember = methods.delete

export const subscribeMembers = memoize((orgId: string) =>
  subscribeQuery(
    query(collection, where('orgId', '==', orgId), orderBy('name'))
  )
)

export async function getMembers(orgId: string) {
  return executeQuery(
    query(collection, where('orgId', '==', orgId), orderBy('name'))
  )
}

// Upload member picture and return URL
export async function uploadPicture(
  orgId: string,
  memberId: string,
  file: File
): Promise<string> {
  const fileRef = ref(storage, `orgs/${orgId}/members/${memberId}`)
  await uploadBytes(fileRef, file)
  return getDownloadURL(fileRef)
}

export async function inviteMember(
  memberId: string,
  role: ClaimRole,
  email: string
): Promise<void> {
  await httpsCallable(
    functions,
    'inviteMember'
  )({
    memberId,
    role,
    email,
  })
}

export async function acceptMemberInvitation(
  memberId: string,
  token: string
): Promise<void> {
  await httpsCallable(
    functions,
    'acceptMemberInvitation'
  )({
    memberId,
    token,
  })
}

export async function updateMemberRole(
  memberId: string,
  role: ClaimRole | undefined
): Promise<void> {
  await httpsCallable(
    functions,
    'updateMemberRole'
  )({
    memberId,
    role,
  })
}
