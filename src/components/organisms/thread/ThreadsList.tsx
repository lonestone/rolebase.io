import { Text, VStack } from '@chakra-ui/react'
import { ThreadWithStatus } from '@hooks/useThreads'
import ThreadItem from '@molecules/thread/ThreadItem'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  threads: ThreadWithStatus[]
  showCircle?: boolean
}

export default function ThreadsList({ threads, showCircle }: Props) {
  const { t } = useTranslation()

  return (
    <VStack spacing={0} align="stretch">
      {threads.length === 0 && (
        <Text fontStyle="italic">{t('ThreadsList.empty')}</Text>
      )}

      {threads.map((thread, i) => (
        <ThreadItem
          key={thread.id}
          className={i < 3 ? `userflow-thread-${i}` : undefined}
          thread={thread}
          showCircle={showCircle}
          unread={thread.read === false}
        />
      ))}
    </VStack>
  )
}