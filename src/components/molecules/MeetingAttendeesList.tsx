import {
  sendNotification,
  startMembersMeeting,
  stopMembersMeeting,
} from '@api/functions'
import { BoxProps, VStack } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import { MeetingState } from '@hooks/useMeetingState'
import { MeetingAttendee } from '@shared/model/meeting'
import { NotificationCategories } from '@shared/model/notification'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import { useUpdateMeetingMutation } from 'src/graphql.generated'
import settings from 'src/settings'
import MeetingAttendeeItem from './MeetingAttendeeItem'
import MemberSearchButton from './search/entities/members/MemberSearchButton'

interface Props extends BoxProps {
  meetingState: MeetingState
}

export default function MeetingAttendeesList({
  meetingState,
  ...boxProps
}: Props) {
  const { meeting, circle, editable, path } = meetingState
  const attendees = meeting?.attendees

  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const [updateMeeting] = useUpdateMeetingMutation()

  const attendeesMemberIds = useMemo(
    () => attendees?.map((a) => a.memberId) || [],
    [attendees]
  )

  const updateAttendees = (attendees: MeetingAttendee[]) => {
    if (!meeting) return
    return updateMeeting({
      variables: {
        id: meeting.id,
        values: {
          attendees,
        },
      },
    })
  }

  const handlePresentChange = (memberId: string, present: boolean | null) => {
    if (!meeting || !attendees) return
    updateAttendees(
      attendees.map((a) => (a.memberId === memberId ? { ...a, present } : a))
    )
  }

  const handleAdd = (memberId: string) => {
    if (!meeting || !attendees) return
    updateAttendees(
      attendees.concat({
        memberId,
        circlesIds: [],
        present: null,
      })
    )

    // Set user's current meeting
    startMembersMeeting({
      membersIds: [memberId],
      meetingId: meeting.id,
    })

    // Send notification
    if (circle && currentMember && currentMember.id !== memberId) {
      const notifParams = {
        role: circle.role.name,
        title: meeting.title,
        sender: currentMember.name,
      }
      sendNotification({
        category: NotificationCategories.MeetingInvited,
        title: t('notifications.MeetingInvited.title', notifParams),
        content: t('notifications.MeetingInvited.content', notifParams),
        recipientMemberIds: [memberId],
        topic: meeting.id,
        url: `${settings.url}${path}`,
      })
    }
  }

  const handleRemove = (memberId: string) => {
    if (!meeting || !attendees) return
    if (!confirm(t('MeetingAttendees.confirmRemove'))) return
    updateAttendees(attendees.filter((a) => a.memberId !== memberId))

    // Reset user's current meeting
    stopMembersMeeting({ meetingId: meeting.id })
  }

  if (!attendees) return null

  return (
    <VStack align="start" {...boxProps}>
      {attendees.map((attendee) => (
        <MeetingAttendeeItem
          key={attendee.memberId}
          attendee={attendee}
          editable={editable}
          onPresentChange={(present) =>
            handlePresentChange(attendee.memberId, present)
          }
          onRemove={() => handleRemove(attendee.memberId)}
        />
      ))}

      {editable && (
        <MemberSearchButton
          excludeIds={attendeesMemberIds}
          size="sm"
          variant="ghost"
          leftIcon={<FiPlus />}
          onSelect={handleAdd}
        >
          {t('MeetingAttendees.add')}
        </MemberSearchButton>
      )}
    </VStack>
  )
}
