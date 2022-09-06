import { ClaimRole, isRoleSufficient } from '@shared/model/userClaims'
import * as functions from 'firebase-functions'
import { auth } from '../firebase'

export function guardAuth(context: functions.https.CallableContext) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Authentication required'
    )
  }
  return context.auth
}

export async function guardOrg(
  context: functions.https.CallableContext,
  orgId: string,
  minRole: ClaimRole
) {
  const uid = context.auth?.uid
  if (!uid) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Authentication required'
    )
  }
  const userRecord = await auth.getUser(uid)
  const role = userRecord.customClaims?.[`org-${orgId}`]
  if (!isRoleSufficient(role, minRole)) {
    throw new functions.https.HttpsError('permission-denied', 'Not allowed')
  }
}

export async function guarSuperAdmin(context: functions.https.CallableContext) {
  const uid = context.auth?.uid
  if (!uid) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Authentication required'
    )
  }
  const userRecord = await auth.getUser(uid)
  const isSuperAdmin = userRecord.customClaims?.superAdmin
  if (!isSuperAdmin) {
    throw new functions.https.HttpsError('permission-denied', 'Not allowed')
  }
}

export function guardArgument<Payload>(
  payload: Payload,
  argName: keyof Payload,
  type?: 'string' | 'number' | 'boolean' | 'object'
) {
  if (!(argName in payload) || (type && typeof payload[argName] !== type)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      `${String(argName)} not provided`
    )
  }
}
