import { Text } from '@chakra-ui/react'
import ThreadActivityMessage from '@components/molecules/ThreadActivityMessage'
import { ActivityEntry, ActivityType } from '@shared/model/thread_activity'
import React, { memo } from 'react'
import ThreadActivityDecision from './ThreadActivityDecision'
import ThreadActivityMeeting from './ThreadActivityMeeting'
import ThreadActivityPoll from './ThreadActivityPoll'
import ThreadActivityTask from './ThreadActivityTask'
import ThreadActivityThread from './ThreadActivityThread'

interface Props {
  activity: ActivityEntry
}

function ThreadActivity({ activity }: Props) {
  switch (activity.type) {
    case ActivityType.Message:
      return <ThreadActivityMessage activity={activity} />
    case ActivityType.Poll:
      return <ThreadActivityPoll activity={activity} />
    case ActivityType.Thread:
      return <ThreadActivityThread activity={activity} />
    case ActivityType.Meeting:
      return <ThreadActivityMeeting activity={activity} />
    case ActivityType.Task:
      return <ThreadActivityTask activity={activity} />
    case ActivityType.Decision:
      return <ThreadActivityDecision activity={activity} />
    default:
      return <Text>{JSON.stringify(activity)}</Text>
  }
}

export default memo(ThreadActivity)
