import { pollAnswersEntities } from '@api/entities/pollAnswers'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import HourLink from '@components/atoms/HourLink'
import Loading from '@components/atoms/Loading'
import Markdown from '@components/atoms/Markdown'
import MemberLink from '@components/atoms/MemberLink'
import TextErrors from '@components/atoms/TextErrors'
import ActivityPollModal from '@components/organisms/modals/ActivityPollModal'
import usePollState from '@hooks/usePollState'
import useSubscription from '@hooks/useSubscription'
import { ActivityPoll } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import ThreadActivityPollResult from './ThreadActivityPollResult'
import ThreadActivityPollVote from './ThreadActivityPollVote'

interface Props {
  activity: WithId<ActivityPoll>
}

export default function ThreadActivityPoll({ activity }: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const members = useStoreState((state) => state.members.entries)
  const member = useMemo(
    () => members?.find((m) => m.userId === activity.userId),
    [activity.userId, members]
  )

  // Edit modal
  const isUserOwner = userId === activity.userId
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  // Answers
  const { createPollAnswer, updatePollAnswer, subscribePollAnswers } =
    pollAnswersEntities(activity.id)
  const {
    data: answers,
    error,
    loading,
  } = useSubscription(subscribePollAnswers())

  const { ended, userAnswer } = usePollState(activity, answers)

  const [editing, setEditing] = useState(false)
  useEffect(() => {
    setEditing(!ended && (!userAnswer || activity.hideUntilEnd))
  }, [userAnswer, ended, activity.hideUntilEnd])

  // Vote
  const handleVote = (choicesPoints: number[]) => {
    if (!answers || !userId) return
    const existingAnswer = answers.find((a) => a.id === userId)
    if (existingAnswer) {
      updatePollAnswer(userId, { choicesPoints })
    } else {
      createPollAnswer({ choicesPoints }, userId)
    }
  }

  return (
    <Flex id={activity.id} p={3} _hover={{ background: '#fafafa' }}>
      <Box flex="1">
        <Text>
          <i>
            {member && <MemberLink member={member} />} a ajouté une décision.
          </i>
          <HourLink timestamp={activity.createdAt} ml={2} />
        </Text>

        <Box
          mt={3}
          borderLeft="2px solid #EDF2F7"
          borderRadius="10px"
          role="group"
        >
          <HStack
            background="gray.100"
            borderRadius="10px"
            h="40px"
            pl={3}
            pr={1}
          >
            <Text fontWeight="bold" mr={6}>
              Sondage
            </Text>
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
          <Box
            p={3}
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
          >
            <Markdown fontSize="1.2rem" fontWeight={500}>
              {activity.question}
            </Markdown>

            {loading && <Loading active size="md" />}
            <TextErrors errors={[error]} />

            {answers &&
              (editing ? (
                <>
                  <ThreadActivityPollVote
                    activity={activity}
                    answers={answers}
                    onVote={handleVote}
                  />
                  {(ended || !activity.hideUntilEnd) && (
                    <Link onClick={() => setEditing(false)}>
                      Voir les résultats
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <ThreadActivityPollResult
                    activity={activity}
                    answers={answers}
                  />
                  {!ended && (
                    <Link onClick={() => setEditing(true)}>
                      Modifier mon vote
                    </Link>
                  )}
                </>
              ))}
          </Box>
        </Box>
      </Box>

      {isEditOpen && (
        <ActivityPollModal
          isOpen
          threadId={activity.threadId}
          activity={activity}
          onClose={onEditClose}
        />
      )}
    </Flex>
  )
}
