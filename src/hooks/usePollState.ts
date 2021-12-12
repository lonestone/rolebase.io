import { ActivityPoll, PollAnswer } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import { useContext, useMemo } from 'react'
import { ThreadContext } from 'src/contexts/ThreadContext'
import useParticipants from './useParticipants'

export default function usePollState(
  activity: WithId<ActivityPoll>,
  answers?: WithId<PollAnswer>[]
) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const thread = useContext(ThreadContext)

  const participants = useParticipants(
    thread?.circleId,
    thread?.participantsScope,
    thread?.participantsMembersIds
  )

  // Is poll ended?
  const ended = useMemo(
    () =>
      // End date reached?
      (activity.endDate && activity.endDate.toDate() < new Date()) ||
      // All participants voted?
      (activity.endWhenAllVoted &&
        answers &&
        participants.every((p) =>
          answers.some((answer) => answer.id === p.member.userId)
        )),
    [answers]
  )

  const userAnswer = useMemo(
    () => userId && answers?.find((answer) => answer.id === userId),
    [userId, answers]
  )

  return { ended, userAnswer }
}
