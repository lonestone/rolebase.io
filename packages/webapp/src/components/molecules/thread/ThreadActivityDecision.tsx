import { Alert, AlertIcon, Text } from '@chakra-ui/react'
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

  return (
    <ThreadActivityLayout activity={activity} allowDelete>
      <Text color="gray.500" _dark={{ color: 'gray.300' }}>
        {t(`ThreadActivityDecision.text`)}
      </Text>
      {activity.refDecision ? (
        <DecisionItem decision={activity.refDecision} showIcon />
      ) : (
        <Alert status="warning">
          <AlertIcon />
          {t('ThreadActivityDecision.notAllowed')}
        </Alert>
      )}
    </ThreadActivityLayout>
  )
}
