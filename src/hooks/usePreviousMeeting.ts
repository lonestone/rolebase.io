import { MeetingFragment, useGetMeetingsQuery } from '@gql'

export default function getLastMeetingByRecurringId(
  currentMeeting?: MeetingFragment
) {
  const { data } = useGetMeetingsQuery({
    variables: {
      recurringId: currentMeeting?.recurringId!,
    },
  })

  return data?.meeting?.findLast(
    (meeting) =>
      new Date(meeting.recurringDate!) <
      new Date(currentMeeting?.recurringDate!)
  )
}
