import {
  sendNotification,
  startMembersMeeting,
  stopMembersMeeting,
} from '@api/functions'
import useCircle from '@hooks/useCircle'
import useCurrentMember from '@hooks/useCurrentMember'
import useOrgAdmin from '@hooks/useOrgAdmin'
import useOrgMember from '@hooks/useOrgMember'
import useParticipants from '@hooks/useParticipants'
import generateVideoConfUrl from '@shared/helpers/generateVideoConfUrl'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { Meeting, MeetingEntry, VideoConfTypes } from '@shared/model/meeting'
import { MeetingStepEntry } from '@shared/model/meeting_step'
import { ParticipantMember } from '@shared/model/member'
import { NotificationCategories } from '@shared/model/notification'
import { useStoreState } from '@store/hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useSubscribeMeetingStepsSubscription,
  useSubscribeMeetingSubscription,
  useUpdateMeetingMutation,
} from 'src/graphql.generated'
import settings from 'src/settings'
import { usePathInOrg } from './usePathInOrg'

export interface MeetingState {
  meeting: MeetingEntry | undefined
  path: string
  loading: boolean
  error: Error | undefined
  steps: MeetingStepEntry[] | undefined
  circle: CircleWithRoleEntry | undefined
  facilitator: ParticipantMember | undefined
  participants: ParticipantMember[]
  canEdit: boolean
  forceEdit: boolean
  editable: boolean
  isParticipant: boolean
  isFacilitator: boolean
  isInitiator: boolean
  isEnded: boolean
  isNotStarted: boolean
  isStarted: boolean
  isStartTimePassed: boolean
  isEndTimePassed: boolean
  videoConfUrl: string | undefined
  handleGoToStep(stepId: string): void
  handleEnd(): void
  handleNextStep(): void
  handleChangeForceEdit(forceEdit: boolean): void
  handleSendStartNotification(): void
}

export default function useMeetingState(meetingId: string): MeetingState {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const isMember = useOrgMember()
  const isAdmin = useOrgAdmin()
  const members = useStoreState((state) => state.members.entries)
  const [updateMeeting] = useUpdateMeetingMutation()

  // Subscribe meeting
  const { data, loading, error } = useSubscribeMeetingSubscription({
    variables: { id: meetingId },
  })
  const meeting = data?.meeting_by_pk as MeetingEntry | undefined

  // Meeting page path
  const path = usePathInOrg(`meetings/${meeting?.id}`)

  // Subscribe meeting steps
  const {
    data: stepsData,
    error: stepsError,
    loading: stepsLoading,
  } = useSubscribeMeetingStepsSubscription({ variables: { meetingId } })
  const steps = stepsData?.meeting_step as MeetingStepEntry[] | undefined

  // Meeting not started?
  const isEnded = !!meeting?.ended
  const isNotStarted = !isEnded && meeting?.currentStepId === null
  const isStarted = !isEnded && meeting?.currentStepId !== null

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

  // Is current member participant? facilitator?
  const isParticipant = currentMember
    ? participants.some((p) => p.member.id === currentMember.id)
    : false
  const isFacilitator =
    isMember && currentMember?.id === meeting?.facilitatorMemberId
  const isInitiator = currentMember?.id === meeting?.initiatorMemberId
  const facilitator = participants?.find(
    (p) => p.member.id === meeting?.facilitatorMemberId
  )
  const canEdit = isMember && (isParticipant || isInitiator || isAdmin)

  // Circle
  const circle = useCircle(meeting?.circleId)

  // Edit mode when meeting is ended
  const [forceEdit, setForceEdit] = useState(false)

  // Data is editable
  const editable = canEdit && (!isEnded || forceEdit)

  // Reset forced edition when meeting is not ended anymore
  useEffect(() => {
    if (forceEdit && !meeting?.ended) {
      setForceEdit(false)
    }
  }, [meeting?.ended, forceEdit])

  // Scroll to current step
  useEffect(() => {
    const stepId = meeting?.currentStepId
    if (!stepId) return
    setTimeout(() => {
      document
        .getElementById(`step-${stepId}`)
        ?.scrollIntoView({ behavior: 'smooth' })
    }, 300) // Wait for animations that can change the height of above elements
  }, [meeting?.currentStepId])

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
      const changedFields: Partial<Meeting> = {
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
  const handleSendStartNotification = useCallback(async () => {
    if (!meeting || !meeting.attendees || !circle || !currentMember) return

    // Send notification
    const notifParams = {
      role: circle.role.name,
      title: meeting.title,
      sender: currentMember.name,
    }
    sendNotification({
      category: NotificationCategories.MeetingStarted,
      title: t('notifications.MeetingStarted.title', notifParams),
      content: t('notifications.MeetingStarted.content', notifParams),
      recipientMemberIds: meeting.attendees
        .map((a) => a.memberId)
        .filter((id) => id !== currentMember.id),
      topic: meeting.id,
      url: `${settings.url}${path}`,
    })
  }, [meeting, path])

  // Video conference URL
  const videoConfUrl = useMemo(() => {
    if (!meeting?.videoConf || !circle || !currentMember) return
    if (meeting.videoConf.type === VideoConfTypes.Jitsi) {
      return generateVideoConfUrl(meeting, circle, currentMember)
    }
    if (meeting.videoConf.type === VideoConfTypes.Url) {
      return meeting.videoConf.url
    }
  }, [meeting, circle, currentMember])

  return {
    meeting,
    path,
    loading: loading || stepsLoading,
    error: error || stepsError,
    steps,
    circle,
    facilitator,
    participants,
    canEdit,
    forceEdit,
    editable,
    isParticipant,
    isFacilitator,
    isInitiator,
    isEnded,
    isNotStarted,
    isStarted,
    isStartTimePassed,
    isEndTimePassed,
    videoConfUrl,
    handleGoToStep,
    handleEnd,
    handleNextStep,
    handleChangeForceEdit: setForceEdit,
    handleSendStartNotification,
  }
}
