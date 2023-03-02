import { md5 } from '@utils/md5'
import settings from '@utils/settings'

export function generateInviteToken(memberId: string, inviteDate: Date) {
  return md5(
    memberId + inviteDate.toISOString() + settings.security.invitation_token
  )
}
