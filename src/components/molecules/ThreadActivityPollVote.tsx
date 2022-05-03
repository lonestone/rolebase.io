import { Box, Button, Stack, StackItem, Text } from '@chakra-ui/react'
import NumberInput from '@components/atoms/NumberInput'
import useDateLocale from '@hooks/useDateLocale'
import usePollState from '@hooks/usePollState'
import { ActivityPoll, PollAnswer } from '@shared/activity'
import { WithId } from '@shared/types'
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
    if (!userAnswer) return
    reset({
      choices: userAnswer.choicesPoints.map((points) => ({ points })),
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
    if (activity.multiple) {
      // Multiple choice
      if (choicesFields[choiceId].points) {
        // Remove vote
        updateChoice(choiceId, { points: 0 })
      } else {
        // Add vote
        updateChoice(choiceId, { points: 1 })
      }
    } else {
      // Single choice
      if (!choicesFields[choiceId].points) {
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
            {t('molecules.ThreadActivityPollVote.chooseN', {
              n: activity.minAnswers,
            })}
          </Text>
        ) : activity.minAnswers && activity.maxAnswers ? (
          <Text>
            {t('molecules.ThreadActivityPollVote.chooseMinAndMax', {
              min: activity.minAnswers,
              max: activity.maxAnswers,
            })}
          </Text>
        ) : activity.minAnswers ? (
          <Text>
            {t('molecules.ThreadActivityPollVote.chooseMin', {
              min: activity.minAnswers,
            })}
          </Text>
        ) : activity.maxAnswers ? (
          <Text>
            {t('molecules.ThreadActivityPollVote.chooseMax', {
              max: activity.maxAnswers,
            })}
          </Text>
        ) : (
          <Text>{t('molecules.ThreadActivityPollVote.chooseMultiple')}</Text>
        ))}

      {activity.anonymous && (
        <Text>{t('molecules.ThreadActivityPollVote.anonymous')}</Text>
      )}

      <Stack spacing={1} mt={3} align="stretch">
        {displayOrder.map((index) => {
          const choice = activity.choices[index]
          const { points } = choicesFields[index]
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
              <Text>
                {t('molecules.ThreadActivityPollVote.pointsDistributed')}
              </Text>
            ) : remainingPoints > 0 ? (
              <Text>
                {t('molecules.ThreadActivityPollVote.pointsRemaining', {
                  count: remainingPoints,
                })}
              </Text>
            ) : (
              <Text>
                {t('molecules.ThreadActivityPollVote.pointsExceeded', {
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
              {t('molecules.ThreadActivityPollVote.vote')}
            </Button>
          </Box>
        </>
      )}

      {!ended && activity.hideUntilEnd && (
        <Text mt={2}>
          {activity.endDate
            ? t(
                activity.endWhenAllVoted
                  ? 'molecules.ThreadActivityPollVote.revealDateOrAllVoted'
                  : 'molecules.ThreadActivityPollVote.revealDate',
                {
                  date: format(activity.endDate.toDate(), 'PPPP', {
                    locale: dateLocale,
                  }),
                }
              )
            : activity.endWhenAllVoted
            ? t('molecules.ThreadActivityPollVote.revealAllVoted')
            : t('molecules.ThreadActivityPollVote.revealLater')}
        </Text>
      )}
    </>
  )
}

export default memo(ThreadActivityPollVote)
