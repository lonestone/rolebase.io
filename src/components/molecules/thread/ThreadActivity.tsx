import { Text } from '@chakra-ui/react'
import { ThreadActivityFragment, Thread_Activity_Type_Enum } from '@gql'
import React, { memo } from 'react'
import ThreadActivityDecision from './ThreadActivityDecision'
import ThreadActivityMeeting from './ThreadActivityMeeting'
import ThreadActivityMessage from './ThreadActivityMessage'
import ThreadActivityPoll from './ThreadActivityPoll'
import ThreadActivityTask from './ThreadActivityTask'
import ThreadActivityThread from './ThreadActivityThread'

interface Props {
  activity: ThreadActivityFragment
}

function ThreadActivity({ activity }: Props) {
  switch (activity.type) {
    case Thread_Activity_Type_Enum.Message:
      return <ThreadActivityMessage activity={activity as any} />
    case Thread_Activity_Type_Enum.Poll:
      return <ThreadActivityPoll activity={activity as any} />
    case Thread_Activity_Type_Enum.Thread:
      return <ThreadActivityThread activity={activity as any} />
    case Thread_Activity_Type_Enum.Meeting:
      return <ThreadActivityMeeting activity={activity as any} />
    case Thread_Activity_Type_Enum.Task:
      return <ThreadActivityTask activity={activity as any} />
    case Thread_Activity_Type_Enum.Decision:
      return <ThreadActivityDecision activity={activity as any} />
    default:
      return <Text>{JSON.stringify(activity)}</Text>
  }
}

export default memo(ThreadActivity)
