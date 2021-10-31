import * as functions from 'firebase-functions'

export function guardAuth(context: functions.https.CallableContext) {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Member not found')
  }
  return context.auth
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
