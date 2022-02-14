import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { Box } from '@chakra-ui/react'
import Markdown from '@components/atoms/Markdown'
import MarkdownEditor from '@components/atoms/MarkdownEditor'
import MeetingStepContentThreads from '@components/molecules/MeetingStepContentThreads'
import { MeetingStepConfig } from '@shared/meeting'
import { MeetingStepEntry, MeetingStepTypes } from '@shared/meetingStep'
import throttle from 'lodash.throttle'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

interface Props {
  meetingId: string
  current: boolean
  editable: boolean
  stepConfig: MeetingStepConfig
  step: MeetingStepEntry
}

export default function MeetingStepContent({
  meetingId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  current,
  editable,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stepConfig,
  step,
}: Props) {
  // Subscribe meeting steps
  const { updateMeetingStep } = meetingStepsEntities(meetingId)

  // Notes
  const [notesDirty, setNotesDirty] = useState(false)
  const [notes, setNotes] = useState(step.notes)

  const handleNotesChange = useCallback((value: string) => {
    setNotes(value)
    setNotesDirty(true)
    saveNotes(value)
  }, [])

  const saveNotes = useMemo(
    () =>
      throttle((value: string) => {
        updateMeetingStep(step.id, { notes: value })
        setNotesDirty(false)
      }, 2000),
    [step.id]
  )

  // Update notes on step update
  useEffect(() => {
    if (notesDirty) {
      // TODO : merge conflicts if notesDirty is true
    }
    setNotes(step.notes)
  }, [step.notes])

  return (
    <>
      {step.type === MeetingStepTypes.Threads && (
        <Box mb={5}>
          <MeetingStepContentThreads
            meetingId={meetingId}
            step={step}
            editable={editable}
          />
        </Box>
      )}

      {editable ? (
        <MarkdownEditor
          value={notes}
          placeholder="Notes..."
          onChange={handleNotesChange}
        />
      ) : (
        <Markdown>{step?.notes || ''}</Markdown>
      )}
    </>
  )
}
