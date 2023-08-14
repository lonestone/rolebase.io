import { ExpandableText } from '@atoms/ExpandableText'
import Markdown from '@atoms/Markdown'
import { LinkBoxProps } from '@chakra-ui/react'
import { ThreadWithFirstActivityFragment } from '@gql'
import ThreadItem from '@molecules/thread/ThreadItem'
import React from 'react'
import DashboardNewsItemLayout from './DashboardNewsItemLayout'

interface Props extends LinkBoxProps {
  thread: ThreadWithFirstActivityFragment
}

export default function DashboardNewsThread({ thread }: Props) {
  const firstMessage = thread?.activities[0]?.data?.message

  return (
    <DashboardNewsItemLayout
      i18nKey="DashboardNewsThread.action"
      date={thread.createdAt}
      memberId={thread.initiatorMemberId}
    >
      <ThreadItem thread={thread} showCircle fontWeight="bold" my={3} />

      {firstMessage && (
        <ExpandableText p={2} pt={0} noOfLines={4}>
          <Markdown>{firstMessage}</Markdown>
        </ExpandableText>
      )}
    </DashboardNewsItemLayout>
  )
}
