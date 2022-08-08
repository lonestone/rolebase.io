import { subscribeDecision } from '@api/entities/decisions'
import { Text } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadActivityLayout from '@components/atoms/ThreadActivityLayout'
import useSubscription from '@hooks/useSubscription'
import { ActivityDecision } from '@shared/model/activity'
import { WithId } from '@shared/model/types'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DecisionItem from './DecisionItem'

interface Props {
  activity: WithId<ActivityDecision>
}

export default function ThreadActivityDecision({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useStoreState((state) => state.auth.user?.id)

  // Edition
  const isUserOwner = userId === activity.userId

  const {
    data: decision,
    loading,
    error,
  } = useSubscription(subscribeDecision(activity.entityId))

  return (
    <ThreadActivityLayout activity={activity} allowDelete={isUserOwner}>
      <Text color="gray.500">{t(`ThreadActivityDecision.text`)}</Text>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />
      {decision && <DecisionItem decision={decision} showIcon />}
    </ThreadActivityLayout>
  )
}
