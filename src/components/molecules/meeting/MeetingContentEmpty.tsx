import Loading from '@atoms/Loading'
import { Button, Container, HStack, Text } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useGetPrevMeetingStepsQuery } from '@gql'
import useCreateMissingMeetingSteps from '@hooks/useCreateMissingMeetingSteps'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function MeetingContentEmpty() {
  const { t } = useTranslation()

  const { meeting, circle, steps, canEdit } = useContext(MeetingContext)!

  // Get previous meeting's steps if they exist
  const { data, loading } = useGetPrevMeetingStepsQuery({
    skip: !meeting,
    variables: {
      beforeDate: meeting!.startDate,
      stepsIds: meeting!.stepsConfig.map((s) => s.id),
    },
  })
  const prevMeetingSteps = data?.meeting[0]?.steps

  const [creating, setCreating] = useState(false)

  // Create new empty steps
  const createMissingMeetingSteps = useCreateMissingMeetingSteps()
  const handleNew = () => {
    if (!meeting || !circle || !steps) return
    setCreating(true)
    createMissingMeetingSteps(
      meeting,
      circle,
      steps.map((s) => s.stepConfigId)
    )
  }

  // If no previous meeting, create empty steps and skip
  useEffect(() => {
    if (loading || prevMeetingSteps) return
    handleNew()
  }, [prevMeetingSteps, loading])

  // Copy steps from last meeting
  const handleCopy = () => {
    if (!meeting || !circle || !steps) return
    setCreating(true)
    createMissingMeetingSteps(
      meeting,
      circle,
      steps.map((s) => s.stepConfigId),
      prevMeetingSteps
    )
  }

  if (!canEdit) return null

  if (!prevMeetingSteps || creating) {
    return <Loading active size="md" />
  }

  return (
    <Container maxW="3xl" py={10}>
      <HStack spacing={5} align="center">
        <Button colorScheme="blue" onClick={handleNew}>
          {t('MeetingContentEmpty.new')}
        </Button>
        <Text>{t('MeetingContentEmpty.or')}</Text>
        <Button colorScheme="gray" onClick={handleCopy}>
          {t('MeetingContentEmpty.copy')}
        </Button>
      </HStack>
    </Container>
  )
}
