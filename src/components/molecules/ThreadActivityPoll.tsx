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
import ThreadActivityLayout from '@components/molecules/ThreadActivityLayout'
import ActivityPollModal from '@components/organisms/thread/ActivityPollModal'
import usePollState from '@hooks/usePollState'
import { useUserId } from '@nhost/react'
import { ActivityPoll } from '@shared/model/thread_activity'
import { WithId } from '@shared/model/types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useCreateThreadPollAnswerMutation,
  useSubscribeThreadPollAnswersSubscription,
  useUpdateThreadPollAnswerMutation,
} from 'src/graphql.generated'
import ThreadActivityPollResult from './ThreadActivityPollResult'
import ThreadActivityPollVote from './ThreadActivityPollVote'

interface Props {
  activity: WithId<ActivityPoll>
}

export default function ThreadActivityPoll({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()
  const { colorMode } = useColorMode()
  const bgColor = colorMode === 'light' ? 'gray.100' : 'whiteAlpha.100'

  // Edit modal
  const isUserOwner = userId === activity.userId
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  // Answers
  const [createPollAnswer] = useCreateThreadPollAnswerMutation()
  const [updatePollAnswer] = useUpdateThreadPollAnswerMutation()
  const { data, error, loading } = useSubscribeThreadPollAnswersSubscription({
    variables: { activityId: activity.id },
  })
  const answers = data?.thread_poll_answer

  const { ended, userAnswer } = usePollState(activity, answers)

  const [editing, setEditing] = useState(false)

  // Show vote buttons by default if poll not ended
  // and user has not answered or results are hidden
  useEffect(() => {
    setEditing(!ended && (!userAnswer || activity.data.hideUntilEnd))
  }, [userAnswer, ended, activity.data.hideUntilEnd])

  // Vote
  const handleVote = (choicesPoints: number[]) => {
    if (!answers || !userId) return
    const existingAnswer = answers.find((a) => a.userId === userId)
    if (existingAnswer) {
      updatePollAnswer({
        variables: {
          id: existingAnswer.id,
          values: {
            choicesPoints,
          },
        },
      })
    } else {
      createPollAnswer({
        variables: {
          values: {
            activityId: activity.id,
            choicesPoints,
          },
        },
      })
    }
  }

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
            {t(`ThreadActivityPoll.heading`)}
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
            <Markdown>{activity.data.question}</Markdown>
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
                {(ended || !activity.data.hideUntilEnd) && (
                  <Link mt={2} onClick={() => setEditing(false)}>
                    {t(`ThreadActivityPoll.showResults`)}
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
                    {t(`ThreadActivityPoll.changeVote`)}
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
