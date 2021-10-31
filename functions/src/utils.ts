import * as crypto from 'crypto'
import { config } from './firebase'

export function md5(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex')
}

export function generateInviteToken(memberId: string, inviteDate: Date) {
  return md5(
    memberId + inviteDate.toISOString() + config.security.invitation_token
  )
}
