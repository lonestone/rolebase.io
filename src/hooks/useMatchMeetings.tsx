import { MeetingSummaryFragment } from '@gql'
import useParticipants from '@hooks/useParticipants'
import { MeetingFormDataValues } from '@organisms/meeting/MeetingEditModal'

export default function useMatchMeetings(
  newMeeting?: MeetingFormDataValues,
  conflictedMeetings?: MeetingSummaryFragment[]
) {
  if (!newMeeting || !conflictedMeetings) {
    return { matchingParticipants: [] }
  }

  const currentMeetingParticipants = useParticipants(
    newMeeting.circleId,
    newMeeting.participantsScope,
    newMeeting.participantsMembersIds
  ).map((p) => p.member)

  const dataMeetingsParticipants = conflictedMeetings.map((meeting) => {
    return useParticipants(
      meeting.circleId,
      meeting.participantsScope,
      meeting.participantsMembersIds
    ).map((p) => p.member)
  })

  const matchingParticipants = currentMeetingParticipants.filter((p) =>
    dataMeetingsParticipants.some((m) => m.find((mp) => mp.id === p.id))
  )

  return { matchingParticipants }
}
