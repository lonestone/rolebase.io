import { gql, Member_Role_Enum, ThreadActivityFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { adminRequest } from '@utils/adminRequest'
import { checkSendNotificationEvent } from '@utils/notification/checkSendNotificationEvent'
import { guardOrg } from '@utils/guardOrg'
import { HasuraEventOp } from '@utils/nhost'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import { threadActivityInsertAction } from '@utils/notification/thread/threadActivityInsertAction'
import { ThreadActivityNotification } from '@utils/notification/thread/threadActivityNotification'
import { route, RouteError } from '@utils/route'

export default route(async (context): Promise<void> => {
  const {
    fullEvent: { event },
    senderUserId,
  } = checkSendNotificationEvent<ThreadActivityFragment>(context)

  // Currently we just send notification when a new thread is inserted in DB
  if (event.op !== HasuraEventOp.INSERT) {
    return
  }

  // Get thread activity org
  const threadActivityOrgResult = await adminRequest(GET_THREAD_ACTIVITY_ORG, {
    threadId: event.data.new!.threadId,
    userId: senderUserId,
  })

  // Check permission for new thread org
  if (!threadActivityOrgResult.org?.[0]) {
    throw new RouteError(404, 'No org found for this thread activity')
  }
  const org = threadActivityOrgResult.org[0]
  await guardOrg(org.id, Member_Role_Enum.Member, {
    userId: senderUserId,
  })

  // Check if new thread activity id
  if (!event.data.new!.id) {
    throw new RouteError(404, 'No new thread activity')
  }
  // What needs to be done
  const threadActivityActionReturn = await threadActivityInsertAction(
    event.data.new!.id
  )

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

  const { orgId, id, title, circle } =
    threadActivityActionReturn.threadActivity.thread

  // Build ThreadActivityNotification instance for each recipient
  const notification = new ThreadActivityNotification(locale, {
    org,
    orgId,
    threadId: id,
    title,
    role: circle.role.name,
  })
  // Send notification "threadactivity"
  await notification.send(recipients)
})

const GET_THREAD_ACTIVITY_ORG = gql(`
  query getThreadActivityOrg($threadId: uuid!, $userId:uuid!) {
    org(where: { _and: [{threads: {id: {_eq: $threadId}}}, {members: {userId: {_eq: $userId}}}]}) {
      ...Org
      members(where: {userId: {_eq: $userId}}) {
        id
      }
    }
  }
`)
