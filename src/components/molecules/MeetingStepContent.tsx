import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { Box } from '@chakra-ui/react'
import Markdown from '@components/atoms/Markdown'
import MarkdownEditor from '@components/atoms/MarkdownEditor'
import MeetingStepContentTasks from '@components/molecules/MeetingStepContentTasks'
import MeetingStepContentThreads from '@components/molecules/MeetingStepContentThreads'
import { MeetingStepConfig } from '@shared/meeting'
import { MeetingStepEntry, MeetingStepTypes } from '@shared/meetingStep'
import { applyPatch, createPatch } from 'diff'
import throttle from 'lodash.throttle'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  meetingId: string
  current: boolean
  editable: boolean
  stepConfig: MeetingStepConfig
  step: MeetingStepEntry
  meetingStatus: boolean
}

export default function MeetingStepContent({
  meetingId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  current,
  editable,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stepConfig,
  step,
  meetingStatus,
}: Props) {
  // Subscribe meeting steps
  const { updateMeetingStep } = meetingStepsEntities(meetingId)

  // Notes
  const [notes, setNotes] = useState(step.notes)
  const notesDirty = useRef<boolean>(false)
  const savedNotes = useRef<string>(step.notes)
  const initialNotes = useRef<string>(step.notes)

  const saveNotes = useMemo(
    () =>
      throttle(
        (value: string) => {
          // Notes have changed from server since edition
          if (initialNotes.current !== savedNotes.current) {
            // Merge modifications
            const patch = createPatch('', initialNotes.current, value)
            value = applyPatch(savedNotes.current, patch, {
              fuzzFactor: Infinity,
            })
          }

          // Save changes
          updateMeetingStep(step.id, { notes: value })
          notesDirty.current = false
          initialNotes.current = value
          setNotes(value)
        },
        2000,
        { leading: false }
      ),
    [step.id]
  )

  const handleNotesChange = useCallback((value: string) => {
    setNotes(value)
    // At first change since save,
    // save initial notes and mark as dirty
    if (!notesDirty.current) {
      initialNotes.current = savedNotes.current
      notesDirty.current = true
    }
    saveNotes(value)
  }, [])

  // Update notes on step update
  useEffect(() => {
    savedNotes.current = step.notes

    // Update notes only if they are not dirty
    // They will be updated after save
    if (!notesDirty.current) {
      setNotes(step.notes)
    }
  }, [step.notes])

  return (
    <>
      {step.type === MeetingStepTypes.Threads && (
        <Box mb={5}>
          <MeetingStepContentThreads
            meetingId={meetingId}
            step={step}
            editable={editable}
            disableSort={meetingStatus}
          />
        </Box>
      )}
      {step.type === MeetingStepTypes.Tasks && (
        <Box mb={5}>
          <MeetingStepContentTasks
            meetingId={meetingId}
            step={step}
            editable={editable}
            disableSort={meetingStatus}
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
