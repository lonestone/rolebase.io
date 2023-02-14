import { md5 } from './md5'
import settings from './settings'

export function generateMeetingToken(orgId: string) {
  return md5(orgId + settings.security.invitation_token)
}
