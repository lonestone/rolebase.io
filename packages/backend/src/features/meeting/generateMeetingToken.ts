import settings from '../../settings'
import { md5 } from '../../utils/md5'

export function generateMeetingToken(orgId: string) {
  return md5(orgId + settings.security.invitation_token)
}
