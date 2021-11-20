import { Text } from '@chakra-ui/react'
import { ThreadActivityMessage } from '@components/molecules/ThreadActivityMessage'
import { ActivityEntry, ActivityType } from '@shared/activity'
import React from 'react'
import { ThreadActivityDecision } from './ThreadActivityDecision'

interface Props {
  activity: ActivityEntry
}

export default function ThreadActivity({ activity }: Props) {
  switch (activity.type) {
    case ActivityType.Message:
      return <ThreadActivityMessage activity={activity} />
    case ActivityType.Decision:
      return <ThreadActivityDecision activity={activity} />
    default:
      return <Text>{JSON.stringify(activity)}</Text>
  }
}
