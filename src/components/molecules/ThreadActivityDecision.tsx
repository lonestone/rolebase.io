import {
  Box,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import CircleAndParentsButton from '@components/atoms/CircleAndParentsButton'
import { HourLink } from '@components/atoms/HourLink'
import Markdown from '@components/atoms/Markdown'
import { MemberLink } from '@components/atoms/MemberLink'
import ActivityDecisionModal from '@components/organisms/modals/ActivityDecisionModal'
import { ActivityDecision } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { FiEdit3 } from 'react-icons/fi'

interface Props {
  activity: WithId<ActivityDecision>
}

export function ThreadActivityDecision({ activity }: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const members = useStoreState((state) => state.members.entries)
  const member = useMemo(
    () => members?.find((m) => m.userId === activity.userId),
    [activity.userId, members]
  )

  // Edit modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  // Edition
  const isUserOwner = userId === activity.userId

  return (
    <Flex id={activity.id} p={3} _hover={{ background: '#fafafa' }}>
      <Box flex="1">
        <Text fontStyle="italic">
          {member && <MemberLink member={member} />} a ajouté une décision.
          <HourLink timestamp={activity.createdAt} />
        </Text>

        <Box mt={3} background="gray.100" borderRadius="10px" role="group">
          <HStack background="gray.200" borderRadius="10px" pl={3} pr={1}>
            <Text fontWeight="bold" mr={6}>
              Décision
            </Text>
            <CircleAndParentsButton id={activity.circleId} />
            <Spacer />
            {isUserOwner && (
              <IconButton
                aria-label="Modifier"
                icon={<FiEdit3 />}
                size="sm"
                float="right"
                display="none"
                _groupHover={{ display: 'inline-flex' }}
                onClick={onEditOpen}
              />
            )}
          </HStack>
          <VStack spacing={3} p={3} align="stretch">
            <Markdown flex={1} fontSize="1.2rem" fontWeight={500}>
              {activity.decision}
            </Markdown>
            <Markdown>{activity.explanation}</Markdown>
          </VStack>
        </Box>
      </Box>

      {isEditOpen && (
        <ActivityDecisionModal
          threadId={activity.threadId}
          activity={activity}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
    </Flex>
  )
}
