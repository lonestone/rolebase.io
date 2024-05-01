import {
  Button,
  HTMLChakraProps,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { ChevronDownIcon, ChevronUpIcon } from 'src/icons'
import { ThreadWithStatus } from '../hooks/useThreads'
import ThreadItem from './ThreadItem'

interface Props {
  threads: ThreadWithStatus[]
  noModal?: boolean
  showIcon?: boolean
  showCircle?: boolean
  showMember?: boolean
  max?: number
  itemProps?: HTMLChakraProps<any>
}

export default function ThreadsList({
  threads,
  noModal,
  showIcon,
  showCircle,
  showMember,
  max,
  itemProps,
}: Props) {
  const { t } = useTranslation()
  const expanded = useDisclosure()

  const items = threads.map((thread, i) => (
    <ThreadItem
      key={thread.id}
      className={i < 3 ? `userflow-thread-${i}` : undefined}
      thread={thread}
      noModal={noModal}
      showIcon={showIcon}
      showCircle={showCircle}
      showMember={showMember}
      unread={thread.read === false}
      {...itemProps}
    />
  ))

  // Split items in head and tail
  // to show only a limited number of items defined by max
  // and a "Show more" button
  const hasTail = max && items.length > max
  const headItems = hasTail ? items.slice(0, max) : items
  const tailItems = hasTail ? items.slice(max) : []

  // Always show current thread when present in list
  const path = useLocation()
  if (hasTail && !expanded.isOpen) {
    // Search for current thread in list
    const currentThreadId = path.pathname.replace(/.*\/threads\//, '')
    const i = threads.findIndex((t) => t.id === currentThreadId)
    if (i >= max) {
      // Remove last item to keep same max number of items
      headItems.pop()
      // Add current thread to head
      const [item] = tailItems.splice(i - max, 1)
      headItems.push(item)
    }
  }

  return (
    <VStack spacing={0} align="stretch">
      {threads.length === 0 && (
        <Text fontStyle="italic" textAlign="center">
          {t('ThreadsList.empty')}
        </Text>
      )}

      {headItems}

      {hasTail && (
        <>
          <Button
            variant="link"
            justifyContent="start"
            p={1}
            {...itemProps}
            pl="28px"
            leftIcon={
              expanded.isOpen ? (
                <ChevronUpIcon size="1em" />
              ) : (
                <ChevronDownIcon size="1em" />
              )
            }
            onClick={expanded.onToggle}
          >
            {expanded.isOpen ? t('common.seeLess') : t('common.seeMore')}
          </Button>

          {expanded.isOpen && tailItems}
        </>
      )}
    </VStack>
  )
}
