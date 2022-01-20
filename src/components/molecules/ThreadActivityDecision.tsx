import {
  Box,
  HStack,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import Markdown from '@components/atoms/Markdown'
import ThreadActivityLayout from '@components/atoms/ThreadActivityLayout'
import ActivityDecisionModal from '@components/organisms/modals/ActivityDecisionModal'
import { ActivityDecision } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React from 'react'

interface Props {
  activity: WithId<ActivityDecision>
}

export default function ThreadActivityDecision({ activity }: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const { colorMode } = useColorMode()
  const bgColor = colorMode === 'light' ? '#EDF2F7' : 'rgba(255,255,255,0.05)'

  // Edit modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  // Edition
  const isUserOwner = userId === activity.userId

  return (
    <ThreadActivityLayout
      activity={activity}
      onEdit={isUserOwner ? onEditOpen : undefined}
    >
      <Box
        mt={3}
        borderLeft={`2px solid ${bgColor}`}
        borderRadius="lg"
        role="group"
      >
        <HStack background={bgColor} borderRadius="lg" h="40px" pl={3} pr={1}>
          <Text fontWeight="bold" mr={6}>
            Décision
          </Text>
          <CircleByIdButton circleId={activity.circleId} />
        </HStack>
        <VStack spacing={3} p={3} align="stretch">
          <Markdown flex={1} fontSize="1.2rem" fontWeight={500}>
            {activity.decision}
          </Markdown>
          <Markdown>{activity.explanation}</Markdown>
        </VStack>
      </Box>

      {isEditOpen && (
        <ActivityDecisionModal
          isOpen
          threadId={activity.threadId}
          activity={activity}
          onClose={onEditClose}
        />
      )}
    </ThreadActivityLayout>
  )
}
