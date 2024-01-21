import { useCurrentMeetingsSubscription } from '@gql'
import { useStoreActions } from '@store/hooks'
import { useEffect } from 'react'
import useCurrentMember from './useCurrentMember'

export function useSubscribeCurrentMeeting() {
  const currentMember = useCurrentMember()
  const setCurrentMeetingId = useStoreActions(
    (actions) => actions.memberStatus.setCurrentMeetingId
  )

  // Get current meetings
  const { data } = useCurrentMeetingsSubscription({
    skip: !currentMember,
    variables: { memberId: currentMember?.id! },
  })

  useEffect(() => {
    if (!data) return
    setCurrentMeetingId(data.member_by_pk?.org.meetings[0]?.id || null)
  }, [data])
}
