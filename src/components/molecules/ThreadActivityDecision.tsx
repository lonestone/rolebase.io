import { Text } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadActivityLayout from '@components/molecules/ThreadActivityLayout'
import { useUserId } from '@nhost/react'
import { ActivityDecision } from '@shared/model/thread_activity'
import { WithId } from '@shared/model/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSubscribeDecisionSubscription } from 'src/graphql.generated'
import DecisionItem from './DecisionItem'

interface Props {
  activity: WithId<ActivityDecision>
}

export default function ThreadActivityDecision({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()

  // Edition
  const isUserOwner = userId === activity.userId

  const { data, loading, error } = useSubscribeDecisionSubscription({
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
