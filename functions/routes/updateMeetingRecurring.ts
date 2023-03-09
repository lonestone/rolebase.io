import { gql, MeetingRecurringFragment, Member_Role_Enum } from '@gql'
import { updateMeetingRecurringSchema } from '@shared/schemas'
import { adminRequest } from '@utils/adminRequest'
import { getMeetingParticipantIdsDiff } from '@utils/getMeetingParticipantIdsDiff'
import { guardAuth } from '@utils/guardAuth'
import { guardBodyParams } from '@utils/guardBodyParams'
import { guardOrg } from '@utils/guardOrg'
import { nhost } from '@utils/nhost'
import { route, RouteError } from '@utils/route'
import * as yup from 'yup'

const yupSchema = yup.object().shape({
  meetingId: yup.string().required(),
  values: updateMeetingRecurringSchema,
})

export default route(async (context) => {
  guardAuth(context)

  const { meetingId, values } = guardBodyParams(context, yupSchema)

  // Get old meeting
  const oldMeetingRecurring = await adminRequest(GET_MEETING_RECURRING, {
    id: meetingId,
  })
  if (!oldMeetingRecurring.meeting_recurring_by_pk) {
    throw new RouteError(404, 'Old meeting recurring not found')
  }

  // Check permission
  await guardOrg(
    context,
    oldMeetingRecurring.meeting_recurring_by_pk.orgId,
    Member_Role_Enum.Member
  )

  // Update meeting
  const newMeetingRecurring = await adminRequest(UPDATE_MEETING_RECURRING, {
    id: meetingId,
    values,
  })

  if (!newMeetingRecurring.update_meeting_recurring_by_pk) {
    throw new RouteError(404, 'New meeting recurring not found')
  }

  // Send notification
  // If changes on participants : send meetinginvited notification to new participants
  const newParticipants =
    await getMeetingParticipantIdsDiff<MeetingRecurringFragment>(
      oldMeetingRecurring.meeting_recurring_by_pk,
      newMeetingRecurring.update_meeting_recurring_by_pk!
    )
  if (newParticipants.length !== 0) {
    await nhost.functions.call(
      'routes/sendMeetingInvitedNotification',
      {
        recipientMemberIds: newParticipants,
        meetingId,
        isRecurring: true,
      },
      {
        headers: {
          Authorization: context.req.headers['authorization']!,
        },
      }
    )
  }

  // TODO : Add other changes notifications
})

const GET_MEETING_RECURRING = gql(`
  query getMeetingRecurring($id: uuid!) {
    meeting_recurring_by_pk(id: $id) {
      ...MeetingRecurring
    }
  }
`)

const UPDATE_MEETING_RECURRING = gql(`
  mutation updateMeetingRecurring($id: uuid!, $values: meeting_recurring_set_input!) {
    update_meeting_recurring_by_pk(pk_columns: { id: $id }, _set: $values) {
        ...MeetingRecurring
    }
  }
`)
