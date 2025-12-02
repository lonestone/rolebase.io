import { useAuth } from '@/user/hooks/useAuth'
import { ThreadPollAnswerFragment } from '@gql'
import { ThreadActivityPollFragment } from '@rolebase/shared/model/thread_activity'
import { useContext, useMemo } from 'react'
import { ThreadContext } from '../contexts/ThreadContext'

export default function usePollState(
  activity: ThreadActivityPollFragment,
  answers?: ThreadPollAnswerFragment[]
) {
  const { user } = useAuth()
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
    () => user && answers?.find((answer) => answer.userId === user.id),
    [user?.id, answers]
  )

  return { ended, userAnswer }
}
