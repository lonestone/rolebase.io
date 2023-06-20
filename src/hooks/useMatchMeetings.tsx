// 1. find every meeting which are at the same time as the current meeting
// 2. find if the current meeting doesnt have same participant as the other meeting

import { Meeting, useMeetingsAtSameTimeSubscription } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import useParticipants from '@hooks/useParticipants'

export type CreatedMeeting = Pick<
  Meeting,
  | 'title'
  | 'startDate'
  | 'endDate'
  | 'circleId'
  | 'participantsScope'
  | 'participantsMembersIds'
>

interface Props {
  currentMeeting: CreatedMeeting
}

export default function useMatchMeetings({ currentMeeting }: Props) {
  const orgId = useOrgId()

  console.log(currentMeeting.startDate, currentMeeting.endDate);
  
  // Subscribe to meetings
  const { data } = useMeetingsAtSameTimeSubscription({
    skip: !orgId || !currentMeeting,
    variables: {
      startDate: currentMeeting.startDate.toString()!,
      endDate: currentMeeting.endDate.toString()!,
    },
  })

  const currentMeetingParticipants = useParticipants(
    currentMeeting.circleId,
    currentMeeting.participantsScope,
    currentMeeting.participantsMembersIds
  ).map((p) => p.member)

  console.log({ data })

  const dataMeetingsParticipants = useParticipants(
    data?.meeting[0].circleId,
    data?.meeting[0].participantsScope,
    data?.meeting[0].participantsMembersIds
  ).map((p) => p.member)

  const matchingParticipants = currentMeetingParticipants.filter((p) =>
    dataMeetingsParticipants.some((m) => m.id === p.id)
  )

  return { matchingParticipants }
}
