import { fn } from '@/common/api/functions'
import { Member_Role_Enum } from '@gql'

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

export const archiveMember = fn<{ memberId: string }>('members/archiveMember')
