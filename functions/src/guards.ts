import { Org } from '@shared/org'
import * as functions from 'firebase-functions'
import { collections } from './firebase'

export function guardAuth(context: functions.https.CallableContext) {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Member not found')
  }
  return context.auth
}

export async function guardOrg(
  context: functions.https.CallableContext,
  orgId: string
): Promise<Org> {
  const uid = context?.auth?.uid
  if (!uid) {
    throw new functions.https.HttpsError('unauthenticated', 'Member not found')
  }

  const orgRef = collections.orgs.doc(orgId)
  const orgSnapshot = await orgRef.get()
  const org = orgSnapshot.data()

  if (!org) {
    throw new functions.https.HttpsError('not-found', 'Org not found')
  }

  if (!org.ownersIds.some((ownerId) => ownerId === uid)) {
    throw new functions.https.HttpsError('permission-denied', 'Not allowed')
  }
  return org
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
