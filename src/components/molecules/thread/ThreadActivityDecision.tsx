import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Text } from '@chakra-ui/react'
import { useDecisionSubscription } from '@gql'
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

  const { data, loading, error } = useDecisionSubscription({
    variables: { id: activity.data.entityId },
  })
  const decision = data?.decision_by_pk

  return (
    <ThreadActivityLayout activity={activity} allowDelete={isUserOwner}>
      <Text color="gray.500">{t(`ThreadActivityDecision.text`)}</Text>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
      {decision && <DecisionItem decision={decision} showIcon />}
    </ThreadActivityLayout>
  )
}
