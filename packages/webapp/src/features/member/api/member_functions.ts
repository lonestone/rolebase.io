import { Member_Role_Enum } from '@gql'
import { fn } from '../../common/api/functions'

export const inviteMember = fn<{
  memberId: string
  role: Member_Role_Enum
  email: string
}>('members/inviteMember')

export const acceptMemberInvitation = fn<{
  memberId: string
  token: string
}>('members/acceptMemberInvitation')

export const updateMemberRole = fn<{
  memberId: string
  role?: Member_Role_Enum
}>('members/updateMemberRole')

export const startMembersMeeting = fn<{
  membersIds: string[]
  meetingId: string
}>('members/startMembersMeeting')

export const stopMembersMeeting = fn<{ meetingId: string }>(
  'members/stopMembersMeeting'
)

export const archiveMember = fn<{ memberId: string }>('members/archiveMember')
