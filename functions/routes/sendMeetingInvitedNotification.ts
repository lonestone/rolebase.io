import { Member_Role_Enum } from '@gql'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route } from '@utils/route'
import * as yup from 'yup'
import { guardOrg } from '@utils/guardOrg'
import { getNotificationMeetingData } from '@utils/notification/getNotificationMeetingData'
import { getParticipantIdsByScope } from '@utils/getParticipantIdsByScope'
import { meetingInvitedSend } from '@utils/meetingInvitedSend'

const yupSchema = yup.object({
  recipientMemberIds: yup.array().of(yup.string().required()),
  meetingId: yup.string().required(),
})

export default route(async (context): Promise<void> => {
  guardAuth(context)

  const { meetingId, recipientMemberIds } = guardBodyParams(context, yupSchema)

  // Get meeting data
  const meetingDataResult = await getNotificationMeetingData(
    meetingId,
    context?.userId!
  )

  // Check if user can access org data
  const orgId = meetingDataResult.org.id
  await guardOrg(context, orgId, Member_Role_Enum.Member)

  // Get all recipients list
  // If recipientMemberIds provided : send only to those recipients
  // Else send to all members invited (by scope or extra)
  let allRecipientIds =
    recipientMemberIds ??
    (await getParticipantIdsByScope(
      meetingDataResult.orgId,
      meetingDataResult.circleId,
      meetingDataResult.participantsScope,
      meetingDataResult.participantsMembersIds
    )) ??
    []

  if (!allRecipientIds || allRecipientIds.length === 0) return

  await meetingInvitedSend(context?.userId!, allRecipientIds, meetingDataResult)
})
