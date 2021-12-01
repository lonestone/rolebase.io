import { ActivityPoll, PollAnswer } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function usePollState(
  activity: WithId<ActivityPoll>,
  answers?: WithId<PollAnswer>[]
) {
  const userId = useStoreState((state) => state.auth.user?.id)

  // Is poll ended?
  const ended = useMemo(
    () => activity?.endDate && activity.endDate.toDate() < new Date(),
    [answers]
  )

  const userAnswer = useMemo(
    () => userId && answers?.find((answer) => answer.id === userId),
    [userId, answers]
  )

  return { ended, userAnswer }
}
