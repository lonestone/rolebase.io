import { Box, Stack, StackItem } from '@chakra-ui/react'
import { ActivityPoll, PollAnswer } from '@shared/activity'
import { WithId } from '@shared/types'
import React, { memo, useMemo } from 'react'

interface Props {
  activity: WithId<ActivityPoll>
  answers: WithId<PollAnswer>[]
}

function ThreadActivityPollResult({ activity, answers }: Props) {
  const results = useMemo(
    () =>
      activity.choices
        .map((choice, index) => {
          const points = answers.reduce(
            (sum, answer) => sum + answer.choicesPoints[index],
            0
          )
          return {
            title: choice.title,
            points,
          }
        })
        .sort((a, b) => b.points - a.points),
    [activity, answers]
  )

  const maxPoints = useMemo(
    () => results.reduce((max, result) => Math.max(max, result.points), 0),
    [results]
  )

  return (
    <Stack spacing={1} mt={3} align="stretch">
      {results.map(({ title, points }, index) => {
        const widthRatio = Math.round((points / maxPoints) * 1000) / 10
        return (
          <StackItem key={index} display="flex">
            <Box
              flex="1"
              justifyContent="space-between"
              px={4}
              py={2}
              border="1px solid #3182ce"
              borderRadius="0.375rem"
              minW="200px"
              bg={`linear-gradient(to right, #a6d1fa, #a6d1fa ${widthRatio}%, transparent ${widthRatio}%, transparent 75%);`}
            >
              {title}
            </Box>
            {/* Fixed size box is used to keep buttons the same size */}
            <Box w="70px" pl={2} display="flex" alignItems="center">
              {points} {activity.pointsPerUser ? 'point' : 'vote'}
              {points > 1 ? 's' : ''}
            </Box>
          </StackItem>
        )
      })}
    </Stack>
  )
}

export default memo(ThreadActivityPollResult)
