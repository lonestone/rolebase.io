import settings from '../settings'
import { md5 } from './md5'

export function generateInviteToken(memberId: string, inviteDate: Date) {
  return md5(
    memberId + inviteDate.toISOString() + settings.security.invitation_token
  )
}
