import {
  endMeeting,
  goToNextMeetingStep,
  subscribeMeeting,
  updateMeeting,
} from '@api/entities/meetings'
import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { stopMembersMeeting } from '@api/entities/members'
import useCircle from '@hooks/useCircle'
import useCurrentMember from '@hooks/useCurrentMember'
import useOrgAdmin from '@hooks/useOrgAdmin'
import useOrgMember from '@hooks/useOrgMember'
import useParticipants from '@hooks/useParticipants'
import useSubscription from '@hooks/useSubscription'
import generateVideoConfUrl from '@shared/helpers/generateVideoConfUrl'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { MeetingEntry } from '@shared/model/meeting'
import { MeetingStepEntry } from '@shared/model/meetingStep'
import { ParticipantMember } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface MeetingState {
  meeting: MeetingEntry | undefined
  loading: boolean
  error: Error | undefined
  steps: MeetingStepEntry[] | undefined
  circle: CircleWithRoleEntry | undefined
  facilitator: ParticipantMember | undefined
  participants: ParticipantMember[]
  canEdit: boolean
  forceEdit: boolean
  isParticipant: boolean
  isFacilitator: boolean
  isInitiator: boolean
  isEnded: boolean
  isNotStarted: boolean
  isStarted: boolean
  handleGoToStep(stepId: string): void
  handleEnd(): void
  handleNextStep(): void
  handleJoinVideoConf(): void
  handleChangeForceEdit(forceEdit: boolean): void
}

export default function useMeetingState(meetingId: string): MeetingState {
  const currentMember = useCurrentMember()
  const isMember = useOrgMember()
  const isAdmin = useOrgAdmin()
  const members = useStoreState((state) => state.members.entries)

  // Subscribe meeting
  const {
    data: meeting,
    loading,
    error,
  } = useSubscription(subscribeMeeting(meetingId))

  // Subscribe meeting steps
  const { subscribeMeetingSteps } = meetingStepsEntities(meetingId)
  const {
    data: steps,
    error: stepsError,
    loading: stepsLoading,
  } = useSubscription(subscribeMeetingSteps())

  // Meeting not started?
  const isEnded = !!meeting?.ended
  const isNotStarted = !isEnded && meeting?.currentStepId === null
  const isStarted = !isEnded && meeting?.currentStepId !== null

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

  // Fix current meeting for current member if meeting is not started
  useEffect(() => {
    if (!isStarted && currentMember?.meetingId === meeting.id) {
      stopMembersMeeting([currentMember.id], meeting.id)
    }
  }, [isStarted, currentMember, meeting])

  // Circle
  const circle = useCircle(meeting?.circleId)

  // Edit mode when meeting is ended
  const [forceEdit, setForceEdit] = useState(false)

  // Reset forced edition when meeting is not ended anymore
  useEffect(() => {
    if (forceEdit && !meeting?.ended) {
      setForceEdit(false)
    }
  }, [meeting?.ended, forceEdit])

  // Scroll to step
  const handleScrollToStep = useCallback((stepId: string) => {
    const element = document.getElementById(`step-${stepId}`)
    setTimeout(() => {
      if (!element) return null
      element.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }, [])

  // Go to step
  const handleGoToStep = useCallback(
    async (stepId: string) => {
      if (!meeting) return
      await updateMeeting(meeting.id, {
        currentStepId: stepId,
      })
      handleScrollToStep(stepId)
    },
    [meeting]
  )

  // End meeting
  const handleEnd = useCallback(() => {
    if (!meeting) return
    endMeeting(
      meeting.id,
      participants.map((p) => p.member.id)
    )
  }, [meeting, participants])

  // Next step
  const handleNextStep = useCallback(async () => {
    if (!meeting) return
    const stepId = await goToNextMeetingStep(meeting, participants)
    if (stepId) {
      handleScrollToStep(stepId)
    }
  }, [meeting, participants])

  // Join video conference
  const handleJoinVideoConf = useCallback(() => {
    if (!meeting?.videoConf || !circle || !currentMember) return
    const url =
      typeof meeting.videoConf === 'string'
        ? meeting.videoConf
        : generateVideoConfUrl(meeting, circle, currentMember)
    window.open(url, '_blank')
  }, [meeting, circle, currentMember])

  return {
    meeting,
    loading: loading || stepsLoading,
    error: error || stepsError,
    steps,
    circle,
    facilitator,
    participants,
    canEdit,
    forceEdit,
    isParticipant,
    isFacilitator,
    isInitiator,
    isEnded,
    isNotStarted,
    isStarted,
    handleGoToStep,
    handleEnd,
    handleNextStep,
    handleJoinVideoConf,
    handleChangeForceEdit: setForceEdit,
  }
}
