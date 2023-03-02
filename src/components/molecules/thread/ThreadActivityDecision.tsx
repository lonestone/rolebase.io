import { Text } from '@chakra-ui/react'
import { useUserId } from '@nhost/react'
import { ThreadActivityDecisionFragment } from '@shared/model/thread_activity'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DecisionItem from '../DecisionItem'
import ThreadActivityLayout from './ThreadActivityLayout'

interface Props {
  activity: ThreadActivityDecisionFragment
}

export default function ThreadActivityDecision({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()

  // Edition
  const isUserOwner = userId === activity.userId

  return (
    <ThreadActivityLayout activity={activity} allowDelete={isUserOwner}>
      <Text color="gray.500" _dark={{ color: 'gray.300' }}>
        {t(`ThreadActivityDecision.text`)}
      </Text>
      {activity.refDecision && (
        <DecisionItem decision={activity.refDecision} showIcon />
      )}
    </ThreadActivityLayout>
  )
}
