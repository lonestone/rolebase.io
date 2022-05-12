import { Text } from '@chakra-ui/react'
import ThreadActivityMessage from '@components/molecules/ThreadActivityMessage'
import { ActivityEntry, ActivityType } from '@shared/model/activity'
import React, { memo } from 'react'
import ThreadActivityDecision from './ThreadActivityDecision'
import ThreadActivityPoll from './ThreadActivityPoll'

interface Props {
  activity: ActivityEntry
}

function ThreadActivity({ activity }: Props) {
  switch (activity.type) {
    case ActivityType.Message:
      return <ThreadActivityMessage activity={activity} />
    case ActivityType.Poll:
      return <ThreadActivityPoll activity={activity} />
    case ActivityType.Decision:
      return <ThreadActivityDecision activity={activity} />
    default:
      return <Text>{JSON.stringify(activity)}</Text>
  }
}

export default memo(ThreadActivity)
