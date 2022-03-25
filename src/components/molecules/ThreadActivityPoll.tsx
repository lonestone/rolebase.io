import { pollAnswersEntities } from '@api/entities/pollAnswers'
import {
  Box,
  HStack,
  Link,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import Markdown from '@components/atoms/Markdown'
import TextErrors from '@components/atoms/TextErrors'
import ThreadActivityLayout from '@components/atoms/ThreadActivityLayout'
import ActivityPollModal from '@components/organisms/modals/ActivityPollModal'
import usePollState from '@hooks/usePollState'
import useSubscription from '@hooks/useSubscription'
import { ActivityPoll } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useState } from 'react'
import ThreadActivityPollResult from './ThreadActivityPollResult'
import ThreadActivityPollVote from './ThreadActivityPollVote'

interface Props {
  activity: WithId<ActivityPoll>
}

export default function ThreadActivityPoll({ activity }: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const { colorMode } = useColorMode()
  const bgColor = colorMode === 'light' ? '#EDF2F7' : 'rgba(255,255,255,0.05)'

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

  // Show vote buttons by default if poll not ended
  // and user has not answered or results are hidden
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
            Sondage
          </Text>
          <Spacer />
        </HStack>
        <Box
          p={3}
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
        >
          <Box fontSize="1.2rem" fontWeight={500}>
            <Markdown>{activity.question}</Markdown>
          </Box>

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
                  <Link mt={2} onClick={() => setEditing(false)}>
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
                  <Link mt={2} onClick={() => setEditing(true)}>
                    Modifier mon vote
                  </Link>
                )}
              </>
            ))}
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
    </ThreadActivityLayout>
  )
}
