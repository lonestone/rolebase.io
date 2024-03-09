import { router } from '../../trpc'
import acceptMemberInvitation from './acceptMemberInvitation'
import archiveMember from './archiveMember'
import inviteMember from './inviteMember'
import updateMemberRole from './updateMemberRole'

export default router({
  acceptMemberInvitation,
  archiveMember,
  inviteMember,
  updateMemberRole,
})
