import { ExpandableText } from '@atoms/ExpandableText'
import Markdown from '@atoms/Markdown'
import { LinkBoxProps } from '@chakra-ui/react'
import { DecisionFragment } from '@gql'
import DecisionItem from '@molecules/DecisionItem'
import React from 'react'
import DashboardNewsItemLayout from './DashboardNewsItemLayout'

interface Props extends LinkBoxProps {
  decision: DecisionFragment
}

export default function DashboardNewsDecision({ decision }: Props) {
  return (
    <DashboardNewsItemLayout
      i18nKey="DashboardNewsDecision.action"
      date={decision.createdAt}
      memberId={decision.memberId}
    >
      <DecisionItem
        decision={decision}
        showCircle
        showIcon
        fontWeight="medium"
        my={3}
      />

      {decision?.description && (
        <ExpandableText p={2} pt={0} noOfLines={4}>
          <Markdown>{decision?.description || ''}</Markdown>
        </ExpandableText>
      )}
    </DashboardNewsItemLayout>
  )
}
