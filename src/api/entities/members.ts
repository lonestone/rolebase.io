import { ParticipantMember } from '@hooks/useParticipants'
import { Member, MemberEntry, Participant } from '@shared/member'
import { Optional, WithId } from '@shared/types'
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

const methods = getEntityMethods(collection, {
  createTransform: (member: Optional<Member, 'archived'>) => ({
    archived: false,
    ...member,
  }),
})
export const getMember = methods.get
export const createMember = methods.create
export const updateMember = methods.update

export const subscribeMembers = memoize((orgId: string, archived: boolean) =>
  subscribeQuery(
    query(
      collection,
      where('orgId', '==', orgId),
      where('archived', '==', archived),
      orderBy('name')
    )
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
  file: Blob
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

export async function setInMeetingStatus(
  participants: ParticipantMember[],
  meetingId: string
) {
  return await Promise.all(
    participants.map(async (participant) => {
      const member = await getMember(participant.member.id)
      if (member) {
        if (!member.meetingId) {
          return updateMember(member.id, {
            ...participant.member,
            meetingId: meetingId,
          })
        } else if (meetingId === member.meetingId) {
          return updateMember(member.id, {
            ...participant.member,
            meetingId: null,
          })
        }
      }
      return
    })
  )
}
