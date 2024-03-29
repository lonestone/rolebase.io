import { ThreadPollAnswerFragment } from '@gql'
import { useUserId } from '@nhost/react'
import { ThreadActivityPollFragment } from '@rolebase/shared/model/thread_activity'
import { useContext, useMemo } from 'react'
import { ThreadContext } from '../contexts/ThreadContext'

export default function usePollState(
  activity: ThreadActivityPollFragment,
  answers?: ThreadPollAnswerFragment[]
) {
  const userId = useUserId()
  const { participants } = useContext(ThreadContext)!

  // Is poll ended?
  const ended = useMemo(
    () =>
      // End date reached?
      (activity.data.endDate && new Date(activity.data.endDate) < new Date()) ||
      // All participants voted?
      (activity.data.endWhenAllVoted &&
        answers &&
        participants.every((p) =>
          answers.some((answer) => answer.userId === p.member.userId)
        )),
    [answers]
  )

  const userAnswer = useMemo(
    () => userId && answers?.find((answer) => answer.userId === userId),
    [userId, answers]
  )

  return { ended, userAnswer }
}
