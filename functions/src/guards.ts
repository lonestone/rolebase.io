import { ClaimRole } from '@shared/userClaims'
import * as functions from 'firebase-functions'
import { auth } from './firebase'

export function guardAuth(context: functions.https.CallableContext) {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Member not found')
  }
  return context.auth
}

export async function guardOrg(
  context: functions.https.CallableContext,
  orgId: string,
  role: ClaimRole
) {
  const uid = context?.auth?.uid
  if (!uid) {
    throw new functions.https.HttpsError('unauthenticated', 'Member not found')
  }

  const userRecord = await auth.getUser(uid)
  if (userRecord.customClaims?.[orgId] !== role) {
    throw new functions.https.HttpsError('permission-denied', 'Not allowed')
  }
}

export function guardArgument<Payload>(
  payload: Payload,
  argName: keyof Payload
) {
  if (!(argName in payload)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      `${argName} not provided`
    )
  }
}
