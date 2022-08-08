import { Box, Button, Stack, StackItem, Text } from '@chakra-ui/react'
import NumberInput from '@components/atoms/NumberInput'
import useDateLocale from '@hooks/useDateLocale'
import usePollState from '@hooks/usePollState'
import { ActivityPoll, PollAnswer } from '@shared/model/activity'
import { WithId } from '@shared/model/types'
import { format } from 'date-fns'
import React, { memo, useEffect, useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiCheck } from 'react-icons/fi'

interface Props {
  activity: WithId<ActivityPoll>
  answers: WithId<PollAnswer>[]
  onVote(choicesPoints: number[]): void
}

interface Values {
  choices: Array<{
    points: number
  }>
}

function getRange(length: number): number[] {
  return Array.from(Array(length).keys())
}

function getRandomIndexes(length: number): number[] {
  const indexes: number[] = []
  while (indexes.length < length) {
    const index = Math.floor(Math.random() * length)
    if (!indexes.includes(index)) {
      indexes.push(index)
    }
  }
  return indexes
}

function ThreadActivityPollVote({ activity, answers, onVote }: Props) {
  const { t } = useTranslation()
  const dateLocale = useDateLocale()
  const { ended, userAnswer } = usePollState(activity, answers)

  // Prepare ordered or random indexes choices
  const displayOrder = useMemo(
    () =>
      activity.randomize
        ? getRandomIndexes(activity.choices.length)
        : getRange(activity.choices.length),
    [activity.randomize, activity.choices.length]
  )

  // Vote form
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<Values>({
    defaultValues: {
      choices: userAnswer
        ? userAnswer.choicesPoints.map((points) => ({ points }))
        : activity.choices.map(() => ({ points: 0 })),
    },
  })

  // Reset form when user answer changes
  useEffect(() => {
    reset({
      choices: userAnswer
        ? userAnswer.choicesPoints.map((points) => ({ points }))
        : activity.choices.map(() => ({ points: 0 })),
    })
  }, [userAnswer])

  // Array of choices fields
  const { fields: choicesFields, update: updateChoice } = useFieldArray({
    control,
    name: 'choices',
  })

  const nbSelectedChoices = useMemo(
    () =>
      choicesFields.reduce((sum, choice) => sum + (choice.points ? 1 : 0), 0),
    [choicesFields]
  )
  const usedPoints = useMemo(
    () => choicesFields.reduce((sum, choice) => sum + choice.points, 0),
    [choicesFields]
  )
  const remainingPoints = activity.pointsPerUser
    ? activity.pointsPerUser - usedPoints
    : 0 // Stay at 0 if no points per user
  const notEnoughChoices =
    !!activity.minAnswers && nbSelectedChoices < activity.minAnswers
  const tooMuchChoices =
    !!activity.maxAnswers && nbSelectedChoices > activity.maxAnswers

  const voteButtonDisabled =
    remainingPoints !== 0 || notEnoughChoices || tooMuchChoices

  // Click on a choice button
  const handleToggleVote = (choiceId: number) => {
    const points = choicesFields[choiceId]?.points
    if (activity.multiple) {
      // Multiple choice
      if (points) {
        // Remove vote
        updateChoice(choiceId, { points: 0 })
      } else {
        // Add vote
        updateChoice(choiceId, { points: 1 })
      }
    } else {
      // Single choice
      if (!points) {
        // Change vote
        updateChoice(choiceId, { points: 1 })
        const existingVoteId = choicesFields.findIndex(
          (choice) => choice.points
        )
        if (existingVoteId !== -1) {
          updateChoice(existingVoteId, { points: 0 })
        }
      }
      handleVote()
    }
  }

  const handleVote = handleSubmit(({ choices }) => {
    onVote(choices.map((choice) => choice.points))
  })

  return (
    <>
      {activity.multiple &&
        (activity.minAnswers && activity.minAnswers === activity.maxAnswers ? (
          <Text>
            {t('ThreadActivityPollVote.chooseN', {
              count: activity.minAnswers,
            })}
          </Text>
        ) : activity.minAnswers && activity.maxAnswers ? (
          <Text>
            {t('ThreadActivityPollVote.chooseMinAndMax', {
              min: activity.minAnswers,
              max: activity.maxAnswers,
            })}
          </Text>
        ) : activity.minAnswers ? (
          <Text>
            {t('ThreadActivityPollVote.chooseMin', {
              count: activity.minAnswers,
            })}
          </Text>
        ) : activity.maxAnswers ? (
          <Text>
            {t('ThreadActivityPollVote.chooseMax', {
              count: activity.maxAnswers,
            })}
          </Text>
        ) : (
          <Text>{t('ThreadActivityPollVote.chooseMultiple')}</Text>
        ))}

      {activity.anonymous && (
        <Text>{t('ThreadActivityPollVote.anonymous')}</Text>
      )}

      <Stack spacing={1} mt={3} align="stretch">
        {displayOrder.map((index) => {
          const choice = activity.choices[index]
          const points = choicesFields[index]?.points || 0
          const checked = !!points
          return (
            <StackItem key={index} display="flex">
              <Button
                flex="1"
                justifyContent="space-between"
                variant="outline"
                colorScheme={checked ? 'blue' : 'gray'}
                whiteSpace="break-spaces"
                h="auto"
                py="0.5em"
                rightIcon={checked ? <FiCheck /> : undefined}
                onClick={() => handleToggleVote(index)}
              >
                {choice.title}
              </Button>
              {/* Fixed size box is used to keep buttons the same size */}
              <Box w="70px" pl={2} display="flex" alignItems="center">
                {checked && activity.pointsPerUser ? (
                  <NumberInput
                    value={points}
                    onChange={(value) => updateChoice(index, { points: value })}
                    size="xs"
                    maxW={16}
                    min={1}
                  />
                ) : null}
              </Box>
            </StackItem>
          )
        })}
      </Stack>

      {activity.multiple && nbSelectedChoices > 0 && (!userAnswer || isDirty) && (
        <>
          {activity.pointsPerUser &&
            (remainingPoints === 0 ? (
              <Text>{t('ThreadActivityPollVote.pointsDistributed')}</Text>
            ) : remainingPoints > 0 ? (
              <Text>
                {t('ThreadActivityPollVote.pointsRemaining', {
                  count: remainingPoints,
                })}
              </Text>
            ) : (
              <Text>
                {t('ThreadActivityPollVote.pointsExceeded', {
                  count: -remainingPoints,
                })}
              </Text>
            ))}

          <Box w="70px" pl={2} display="flex" alignItems="center">
            <Button
              mt={2}
              colorScheme="blue"
              isDisabled={voteButtonDisabled}
              onClick={handleVote}
            >
              {t('ThreadActivityPollVote.vote')}
            </Button>
          </Box>
        </>
      )}

      {!ended && activity.hideUntilEnd && (
        <Text mt={2}>
          {activity.endDate
            ? t(
                activity.endWhenAllVoted
                  ? 'ThreadActivityPollVote.revealDateOrAllVoted'
                  : 'ThreadActivityPollVote.revealDate',
                {
                  date: format(activity.endDate.toDate(), 'PPPP', {
                    locale: dateLocale,
                  }),
                }
              )
            : activity.endWhenAllVoted
            ? t('ThreadActivityPollVote.revealAllVoted')
            : t('ThreadActivityPollVote.revealLater')}
        </Text>
      )}
    </>
  )
}

export default memo(ThreadActivityPollVote)
