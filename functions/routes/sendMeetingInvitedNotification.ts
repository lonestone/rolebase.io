import { Member_Role_Enum } from '@gql'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { route, RouteError } from '@utils/route'
import * as yup from 'yup'
import { guardOrg } from '@utils/guardOrg'
import { getNotificationMeetingData } from '@utils/notification/getNotificationMeetingData'
import { meetingInvitedSend } from '@utils/meetingInvitedSend'
import { getParticipantsByScope } from '@shared/helpers/getParticipantsByScope'
import { getOrg } from '@utils/getOrg'

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

  const org = await getOrg(orgId)
  if (!org) {
    throw new RouteError(404, 'Org not found')
  }

  // Get all recipients list
  // If recipientMemberIds provided : send only to those recipients
  // Else send to all members invited (by scope or extra)
  let allRecipientIds =
    recipientMemberIds ??
    getParticipantsByScope(
      org.members,
      meetingDataResult.circleId,
      org.circles,
      meetingDataResult.participantsScope,
      meetingDataResult.participantsMembersIds
    ).map((participant) => participant.member.id) ??
    []

  if (!allRecipientIds || allRecipientIds.length === 0) return

  await meetingInvitedSend(context?.userId!, allRecipientIds, meetingDataResult)
})
