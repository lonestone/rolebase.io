import {
  endMeeting,
  goToNextMeetingStep,
  subscribeMeeting,
  updateMeeting,
} from '@api/entities/meetings'
import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { stopMembersMeeting } from '@api/entities/members'
import { sendNotification } from '@api/entities/notifications'
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
import { NotificationCategories } from '@shared/model/notification'
import { useStoreState } from '@store/hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
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

  // Subscribe meeting
  const {
    data: meeting,
    loading,
    error,
  } = useSubscription(subscribeMeeting(meetingId))

  // Meeting page path
  const path = usePathInOrg(`meetings/${meeting?.id}`)

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

  // Data is editable
  const editable = canEdit && (!isEnded || forceEdit)

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
    return typeof meeting.videoConf === 'string'
      ? meeting.videoConf
      : generateVideoConfUrl(meeting, circle, currentMember)
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
    videoConfUrl,
    handleGoToStep,
    handleEnd,
    handleNextStep,
    handleChangeForceEdit: setForceEdit,
    handleSendStartNotification,
  }
}
