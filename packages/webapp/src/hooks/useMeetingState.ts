import {
  sendMeetingStartedNotification,
  startMembersMeeting,
  stopMembersMeeting,
} from '@api/functions'
import {
  CircleFullFragment,
  MeetingFragment,
  MeetingStepFragment,
  useMeetingSubscription,
  useUpdateMeetingMutation,
} from '@gql'
import useCircle from '@hooks/useCircle'
import useCurrentMember from '@hooks/useCurrentMember'
import useOrgAdmin from '@hooks/useOrgAdmin'
import useOrgMember from '@hooks/useOrgMember'
import useParticipants from '@hooks/useParticipants'
import getMeetingVideoConfUrl from '@shared/helpers/getMeetingVideoConfUrl'
import { MeetingStepConfig } from '@shared/model/meeting'
import { ParticipantMember } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import { isSameDay } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathInOrg } from './usePathInOrg'

/***
 * Meeting state hook
 * /!\ Do not call this too often
 * Consider using MeetingContext instead
 */

export interface MeetingState {
  meeting: MeetingFragment | undefined
  path: string
  loading: boolean
  error: Error | undefined
  steps: MeetingStepFragment[] | undefined
  circle: CircleFullFragment | undefined
  participants: ParticipantMember[]
  currentStep: MeetingStepFragment | undefined
  currentStepConfig: MeetingStepConfig | undefined
  canEdit: boolean
  forceEdit: boolean
  editable: boolean
  isParticipant: boolean
  isEnded: boolean
  isNotStarted: boolean
  isStarted: boolean
  isToday: boolean
  isStartTimePassed: boolean
  isEndTimePassed: boolean
  isLastStep: boolean
  videoConfUrl: string | undefined
  handleScrollToStep(stepId: string): void
  handleGoToStep(stepId: string): void
  handleEnd(): void
  handleNextStep(): void
  handleChangeForceEdit(forceEdit: boolean): void
  handleSendStartNotification(recipientMemberIds: string[]): void
}

export default function useMeetingState(meetingId: string): MeetingState {
  const currentMember = useCurrentMember()
  const isMember = useOrgMember()
  const isAdmin = useOrgAdmin()
  const members = useStoreState((state) => state.org.members)
  const [updateMeeting] = useUpdateMeetingMutation()

  // Subscribe meeting
  const { data, loading, error } = useMeetingSubscription({
    variables: { id: meetingId },
  })
  const meeting = data?.meeting_by_pk || undefined
  const steps = meeting?.steps

  // Meeting page path
  const path = usePathInOrg(`meetings/${meeting?.id}`)

  // Circle
  const circle = useCircle(meeting?.circleId)

  // Meeting not started?
  const isEnded = !!meeting?.ended
  const isNotStarted = !isEnded && meeting?.currentStepId === null
  const isStarted = !isEnded && meeting?.currentStepId !== null

  // Is meeting today?
  const isToday = useMemo(
    () =>
      meeting ? isSameDay(new Date(), new Date(meeting.startDate)) : false,
    [meeting?.startDate]
  )

  // Start time passed?
  const [isStartTimePassed, setStartTimePassed] = useState(false)
  useEffect(() => {
    if (!meeting) return
    const currentTime = new Date().getTime()
    const startDateTime = new Date(meeting.startDate).getTime()

    // Detect if start time has passed now
    const startTimePassed = isNotStarted && currentTime > startDateTime
    setStartTimePassed(startTimePassed)

    if (!startTimePassed && isStarted) {
      // If start time has not passed, schedule status change
      const timeout = window.setTimeout(() => {
        setStartTimePassed(true)
      }, startDateTime - currentTime)
      return () => window.clearTimeout(timeout)
    }
  }, [isStarted, meeting?.startDate])

  // End time passed?
  const [isEndTimePassed, setEndTimePassed] = useState(false)
  useEffect(() => {
    if (!meeting) return
    const currentTime = new Date().getTime()
    const endDateTime = new Date(meeting.endDate).getTime()

    // Detect if end time has passed now
    const endTimePassed = isStarted && currentTime > endDateTime
    setEndTimePassed(endTimePassed)

    if (!endTimePassed && isStarted) {
      // If end time has not passed, schedule status change
      const timeout = window.setTimeout(() => {
        setEndTimePassed(true)
      }, endDateTime - currentTime)
      return () => window.clearTimeout(timeout)
    }
  }, [isStarted, meeting?.endDate])

  // Participants
  const initialParticipants = useParticipants(
    meeting?.circleId,
    meeting?.participantsScope,
    meeting?.participantsMembersIds
  )

  const attendeesParticipants: ParticipantMember[] = useMemo(
    () =>
      (meeting?.attendees
        ?.map(({ memberId, circlesIds }) => {
          const member = members?.find((m) => m.id === memberId)
          if (!member) return
          return { member, circlesIds }
        })
        .filter(Boolean) as ParticipantMember[]) || [],
    [meeting, members]
  )

  // If attendees are set, take them instead of initial participants
  const participants = meeting?.attendees
    ? attendeesParticipants
    : initialParticipants

  // Is current member participant? initiator?
  const isParticipant = currentMember
    ? participants.some((p) => p.member.id === currentMember.id)
    : false
  const canEdit = isMember && (isParticipant || isAdmin)

  // Edit mode when meeting is ended
  const [forceEdit, setForceEdit] = useState(false)

  // Data is editable
  const editable = canEdit && (!isEnded || forceEdit) && !meeting?.archived

  // Reset forced edition when meeting is not ended anymore
  useEffect(() => {
    if (forceEdit && !meeting?.ended) {
      setForceEdit(false)
    }
  }, [meeting?.ended, forceEdit])

  const handleScrollToStep = useCallback((stepId: string) => {
    document
      .getElementById(`step-${stepId}`)
      ?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Scroll to current step
  useEffect(() => {
    const stepId = meeting?.currentStepId
    if (!stepId) return
    handleScrollToStep(stepId)
  }, [meeting?.currentStepId, handleScrollToStep])

  // Current step
  const currentStep = useMemo(() => {
    const stepId = meeting?.currentStepId
    if (!stepId) return
    return steps?.find((s) => s.id === stepId)
  }, [meeting?.currentStepId, steps])

  // Current step config
  const currentStepConfig = useMemo(() => {
    const stepId = currentStep?.stepConfigId
    if (!stepId) return
    return meeting?.stepsConfig?.find((s) => s.id === stepId)
  }, [currentStep?.stepConfigId, meeting?.stepsConfig])

  // Last step
  const isLastStep = useMemo(() => {
    const stepsConfig = meeting?.stepsConfig
    if (!stepsConfig || !currentStep) return false
    const lastStepConfig = stepsConfig[stepsConfig.length - 1]
    if (!lastStepConfig) return false
    return currentStep?.stepConfigId === lastStepConfig.id
  }, [currentStep, meeting?.stepsConfig])

  // Go to step
  const handleGoToStep = useCallback(
    async (stepId: string) => {
      if (!meeting) return
      await updateMeeting({
        variables: {
          id: meeting.id,
          values: {
            currentStepId: stepId,
          },
        },
      })
    },
    [meeting]
  )

  // End meeting
  const handleEnd = useCallback(async () => {
    if (!meeting) return
    await updateMeeting({
      variables: {
        id: meetingId,
        values: {
          currentStepId: null,
          ended: true,
        },
      },
    })
    stopMembersMeeting({ meetingId: meeting.id })
  }, [meeting, participants])

  // Next step
  const handleNextStep = useCallback(async () => {
    if (!meeting || !steps) return

    // Meeting not started
    if (meeting.currentStepId === null) {
      const firstStepConfig = meeting.stepsConfig[0]
      const firstStep =
        firstStepConfig &&
        steps.find((s) => s.stepConfigId === firstStepConfig.id)

      if (!firstStep) {
        // No first step -> end meeting
        await handleEnd()
        return
      }

      // Go to first step
      const changedFields: Partial<Omit<MeetingFragment, 'id'>> = {
        currentStepId: firstStep.id,
        ended: false,
      }

      if (!meeting.attendees) {
        // Set attendees list
        changedFields.attendees = participants.map((participant) => ({
          memberId: participant.member.id,
          circlesIds: participant.circlesIds,
          present: null,
        }))
      }

      await updateMeeting({
        variables: { id: meeting.id, values: changedFields },
      })
      startMembersMeeting({
        membersIds: participants.map((p) => p.member.id),
        meetingId: meeting.id,
      })
      return
    }

    // Find current and next step
    const currentStep = steps.find((s) => s.id === meeting.currentStepId)
    const currentStepIndex = meeting.stepsConfig.findIndex(
      (step) => step.id === currentStep?.stepConfigId
    )
    if (
      currentStepIndex === -1 ||
      currentStepIndex === meeting.stepsConfig.length - 1
    ) {
      // No next step -> end meeting
      await handleEnd()
      return
    }

    // Find next step
    const nextStepConfig = meeting.stepsConfig[currentStepIndex + 1]
    const nextStep = steps.find((s) => s.stepConfigId === nextStepConfig.id)
    if (!nextStep) throw new Error('Next step not found')

    // Go to next step
    await updateMeeting({
      variables: {
        id: meeting.id,
        values: {
          currentStepId: nextStep.id,
        },
      },
    })
  }, [meeting, steps, participants, handleEnd])

  // Next step
  const handleSendStartNotification = useCallback(
    async (recipientMemberIds: string[]) => {
      if (!meeting || !meeting.attendees || !circle || !currentMember) return

      // Send notification
      sendMeetingStartedNotification({
        meetingId: meeting.id,
        recipientMemberIds,
      })
    },
    [meeting, path]
  )

  // Video conference URL
  const videoConfUrl = useMemo(
    () =>
      getMeetingVideoConfUrl(meeting, circle?.role.name, currentMember?.name),
    [meeting, circle, currentMember]
  )

  return {
    meeting,
    path,
    loading,
    error,
    steps,
    circle,
    participants,
    currentStep,
    currentStepConfig,
    canEdit,
    forceEdit,
    editable,
    isParticipant,
    isEnded,
    isNotStarted,
    isStarted,
    isToday,
    isStartTimePassed,
    isEndTimePassed,
    isLastStep,
    videoConfUrl,
    handleScrollToStep,
    handleGoToStep,
    handleEnd,
    handleNextStep,
    handleChangeForceEdit: setForceEdit,
    handleSendStartNotification,
  }
}
