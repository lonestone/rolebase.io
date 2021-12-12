import { Box, Stack, StackItem, Tooltip } from '@chakra-ui/react'
import { ActivityPoll, PollAnswer } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React, { memo, useMemo } from 'react'

interface Props {
  activity: WithId<ActivityPoll>
  answers: WithId<PollAnswer>[]
}

function ThreadActivityPollResult({ activity, answers }: Props) {
  const members = useStoreState((state) => state.members.entries)

  const results = useMemo(
    () =>
      activity.choices
        .map((choice, index) => ({
          // Choice's title
          title: choice.title,

          // Total number of votes for this choice
          points: answers.reduce(
            (sum, answer) => sum + answer.choicesPoints[index],
            0
          ),

          // Voters that gave at least 1 point to this choice
          voters: answers.reduce<string[]>((names, answer) => {
            if (answer.choicesPoints[index] > 0) {
              names.push(
                members?.find((m) => m.userId === answer.id)?.name || '?'
              )
            }
            return names
          }, []),
        }))
        .sort((a, b) => b.points - a.points),
    [activity, members, answers]
  )

  const maxPoints = useMemo(
    () => results.reduce((max, result) => Math.max(max, result.points), 0),
    [results]
  )

  return (
    <Stack spacing={1} mt={3} align="stretch">
      {results.map(({ title, points, voters }, index) => {
        const widthRatio = Math.round((points / maxPoints) * 1000) / 10
        return (
          <StackItem key={index} display="flex">
            <Tooltip
              label={activity.anonymous ? 'Anonyme' : voters.join(', ')}
              placement="top"
              hasArrow
              openDelay={300}
            >
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
            </Tooltip>
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