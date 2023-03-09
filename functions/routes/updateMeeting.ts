import { gql, MeetingFragment, Member_Role_Enum } from '@gql'
import { updateMeetingSchema } from '@shared/schemas'
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
  values: updateMeetingSchema,
})

export default route(async (context) => {
  guardAuth(context)

  const { meetingId, values } = guardBodyParams(context, yupSchema)

  // Get meeting
  const oldMeeting = await adminRequest(GET_MEETING, { id: meetingId })
  if (!oldMeeting.meeting_by_pk) {
    throw new RouteError(404, 'Old meeting not found')
  }

  // Check permission
  await guardOrg(
    context,
    oldMeeting.meeting_by_pk.orgId,
    Member_Role_Enum.Member
  )

  // Update meeting
  const newMeeting = await adminRequest(UPDATE_MEETING, {
    id: meetingId,
    values,
  })
  if (!newMeeting.update_meeting_by_pk) {
    throw new RouteError(404, 'New meeting not found')
  }

  // Send notification
  // If changes on participants : send meetinginvited notification to new participants
  const newParticipants = await getMeetingParticipantIdsDiff<MeetingFragment>(
    oldMeeting.meeting_by_pk,
    newMeeting.update_meeting_by_pk!
  )
  if (newParticipants.length !== 0) {
    await nhost.functions.call(
      'routes/sendMeetingInvitedNotification',
      {
        recipientMemberIds: newParticipants,
        meetingId,
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

const GET_MEETING = gql(`
  query getMeeting($id: uuid!) {
    meeting_by_pk(id: $id) {
      ...Meeting
    }
  }
`)

const UPDATE_MEETING = gql(`
  mutation updateMeeting($id: uuid!, $values: meeting_set_input!) {
    update_meeting_by_pk(pk_columns: { id: $id }, _set: $values) {
        ...Meeting
    }
  }
`)
