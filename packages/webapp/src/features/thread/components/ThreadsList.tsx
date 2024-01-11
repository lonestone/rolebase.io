import { Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ThreadWithStatus } from '../hooks/useThreads'
import ThreadItem from './ThreadItem'

interface Props {
  threads: ThreadWithStatus[]
  showCircle?: boolean
}

export default function ThreadsList({ threads, showCircle }: Props) {
  const { t } = useTranslation()

  return (
    <VStack spacing={0} align="stretch">
      {threads.length === 0 && (
        <Text fontStyle="italic" textAlign="center">
          {t('ThreadsList.empty')}
        </Text>
      )}

      {threads.map((thread, i) => (
        <ThreadItem
          key={thread.id}
          className={i < 3 ? `userflow-thread-${i}` : undefined}
          thread={thread}
          showCircle={showCircle}
          showMember
          unread={thread.read === false}
        />
      ))}
    </VStack>
  )
}
