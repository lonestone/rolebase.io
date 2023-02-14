import { gql } from '@gql'
import { Novu } from '@novu/node'
import { guardAuth } from '@utils/guardAuth'
import { getNotificationYupSchema } from '@utils/getNotificationYupSchema'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import settings from '@utils/settings'
import { NotificationCategories } from '@shared/model/notification'
import { getNotificationRecipients } from '@utils/getNotificationRecipients'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { adminRequest } from '@utils/adminRequest'
import { getOrgSlug } from '@utils/getOrgSlug'

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const yupSchema = getNotificationYupSchema(
    NotificationCategories.meetingstarted
  )

  const { title, content, recipientMemberIds, meetingId, ...rest } =
    guardBodyParams(context, yupSchema)

  // Get recipients
  const recipients = await getNotificationRecipients(recipientMemberIds)
  if (recipients.length === 0) return

  // Get actionUrl
  let actionUrl = settings.url
  const { meeting_by_pk } = await adminRequest(GET_MEETING_ORG_ID, {
    id: meetingId,
  })

  if (meeting_by_pk?.orgId) {
    const org = await getOrgSlug(meeting_by_pk.orgId)

    actionUrl = org
      ? `${actionUrl}${getOrgPath(org)}/meetings/${meetingId}`
      : `${actionUrl}/orgs/${meeting_by_pk.orgId}/meetings/${meetingId}`
  }

  // Novu logic
  const novu = new Novu(settings.novu.apiKey)

  await novu
    .trigger(NotificationCategories.meetingstarted, {
      to: recipients,
      payload: {
        title,
        content,
        actionUrl,
        ...rest,
      },
    })
    .catch((err) => console.error(err))
})

const GET_MEETING_ORG_ID = gql(`
  query getMeetingOrgId($id: uuid!) {
    meeting_by_pk(id: $id) {
      id
      orgId
    }
  }
`)
