import settings from '../settings'
import { md5 } from './md5'

export function generateMeetingToken(orgId: string) {
  return md5(orgId + settings.security.invitation_token)
}
