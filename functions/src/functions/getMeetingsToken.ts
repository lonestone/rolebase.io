import { ClaimRole } from '@shared/userClaims'
import * as functions from 'firebase-functions'
import { config } from '../firebase'
import { guardOrg } from '../guards'
import { md5 } from '../utils'

interface Payload {
  orgId: string
}

export function generateMeetingToken(orgId: string) {
  return md5(orgId + config.security.invitation_token)
}

export const getMeetingsToken = functions.https.onCall(
  async (data: Payload, context) => {
    await guardOrg(context, data.orgId, ClaimRole.Readonly)
    return generateMeetingToken(data.orgId)
  }
)
