import { Text } from '@chakra-ui/react'
import { useUserId } from '@nhost/react'
import { ThreadActivityThreadFragment } from '@shared/model/thread_activity'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ThreadActivityLayout from './ThreadActivityLayout'
import ThreadItem from './ThreadItem'

interface Props {
  activity: ThreadActivityThreadFragment
}

export default function ThreadActivityThread({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()

  // Edition
  const isUserOwner = userId === activity.userId

  return (
    <ThreadActivityLayout activity={activity} allowDelete={isUserOwner}>
      <Text color="gray.500" _dark={{ color: 'gray.300' }}>
        {t(`ThreadActivityThread.text`)}
      </Text>
      {activity.refThread && (
        <ThreadItem thread={activity.refThread} showIcon />
      )}
    </ThreadActivityLayout>
  )
}
