import { gql, Member_Role_Enum, ThreadActivityFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { adminRequest } from '@utils/adminRequest'
import { guardOrg } from '@utils/guardOrg'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { HasuraEvent, HasuraEventOp } from '@utils/nhost'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import { NotificationThreadActivityData } from '@utils/notification/thread/getNotificationThreadActivityData'
import { threadActivityInsertAction } from '@utils/notification/thread/threadActivityInsertAction'
import { ThreadActivityNotification } from '@utils/notification/thread/threadActivityNotification'
import { route, RouteError } from '@utils/route'

export default route(async (context): Promise<void> => {
  guardWebhookSecret(context)

  const event: HasuraEvent<ThreadActivityFragment> = context.req.body

  if (!event) {
    throw new RouteError(400, 'No event')
  }

  // Sender
  const senderUserId = event.event.session_variables['x-hasura-user-id']
  if (!senderUserId) {
    throw new RouteError(401, 'Unauthorized')
  }

  // Check if new thread activity (should always be provided in event)
  if (!event.event.data.new) {
    throw new RouteError(404, 'No new thread activity')
  }

  // Get thread activity org
  const threadActivityOrgResult = await adminRequest(GET_THREAD_ACTIVITY_ORG, {
    threadId: event.event.data.new.threadId,
    userId: senderUserId,
  })

  // Check permission for new thread org
  if (!threadActivityOrgResult.org?.[0]) {
    throw new RouteError(404, 'No org found for this thread activity')
  }
  await guardOrg(
    threadActivityOrgResult.org[0].id,
    Member_Role_Enum.Member,
    senderUserId
  )

  // What needs to be done in each event case
  let threadActivityActionReturn: {
    threadActivity: NotificationThreadActivityData
    participantsIds: string[]
  } | null = null
  switch (event.event.op) {
    case HasuraEventOp.INSERT:
      threadActivityActionReturn = await threadActivityInsertAction(
        event.event.data.new.id,
        senderUserId
      )
      break

    default:
      break
  }

  // Don't send notification if no thread activity or participants
  if (
    !threadActivityActionReturn?.threadActivity.thread ||
    !threadActivityActionReturn?.participantsIds
  ) {
    return
  }

  // Get sender and recipients
  const { sender, recipients } = await getNotificationSenderAndRecipients(
    senderUserId,
    threadActivityActionReturn.participantsIds
  )
  if (recipients.length === 0) {
    return
  }

  const locale = (sender?.locale as keyof typeof resources) || defaultLang

  const { org, orgId, id, title } =
    threadActivityActionReturn.threadActivity.thread

  // Build ThreadActivityNotification instance for each recipient
  const notification = new ThreadActivityNotification(locale, {
    org,
    orgId,
    threadId: id,
    title,
  })
  // Send notification "threadactivity"
  await notification.send(recipients)
})

const GET_THREAD_ACTIVITY_ORG = gql(`
  query getThreadActivityOrg($threadId: uuid!, $userId:uuid!) {
    org(where: { _and: [{threads: {id: {_eq: $threadId}}}, {members: {userId: {_eq: $userId}}}]}) {
      id
    }
  }
`)
