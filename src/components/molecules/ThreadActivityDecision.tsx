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
import { ActivityDecision } from '@shared/model/activity'
import { WithId } from '@shared/model/types'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  activity: WithId<ActivityDecision>
}

export default function ThreadActivityDecision({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useStoreState((state) => state.auth.user?.id)
  const { colorMode } = useColorMode()
  const bgColor = colorMode === 'light' ? 'gray.100' : 'whiteAlpha.100'

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
      allowDelete={isUserOwner}
      onEdit={isUserOwner ? onEditOpen : undefined}
    >
      <Box
        mt={3}
        border="1px solid"
        borderColor={bgColor}
        borderRadius="lg"
        role="group"
      >
        <HStack
          background={bgColor}
          borderTopRadius="lg"
          h="40px"
          pl={3}
          pr={1}
        >
          <Text fontWeight="bold" mr={6}>
            {t(`molecules.ThreadActivityDecision.heading`)}
          </Text>
          <CircleByIdButton circleId={activity.circleId} />
        </HStack>
        <VStack spacing={3} p={3} align="stretch">
          <Box flex={1} fontSize="1.2rem" fontWeight={500}>
            <Markdown>{activity.decision}</Markdown>
          </Box>
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
