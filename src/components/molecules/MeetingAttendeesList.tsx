import { updateMeeting } from '@api/entities/meetings'
import { startMembersMeeting, stopMembersMeeting } from '@api/entities/members'
import { sendNotification } from '@api/entities/notifications'
import { BoxProps, VStack } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import { MeetingState } from '@hooks/useMeetingState'
import { usePathInOrg } from '@hooks/usePathInOrg'
import { NotificationCategories } from '@shared/model/notification'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import MeetingAttendeeItem from './MeetingAttendeeItem'
import MemberSearchButton from './search/entities/members/MemberSearchButton'

interface Props extends BoxProps {
  meetingState: MeetingState
}

export default function MeetingAttendeesList({
  meetingState,
  ...boxProps
}: Props) {
  const { meeting, circle, editable } = meetingState
  const attendees = meeting?.attendees

  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const url = usePathInOrg(`meetings/${meeting?.id}`)

  const attendeesMemberIds = useMemo(
    () => attendees?.map((a) => a.memberId) || [],
    [attendees]
  )

  const handlePresentChange = (memberId: string, present: boolean | null) => {
    if (!meeting || !attendees) return
    updateMeeting(meeting.id, {
      attendees: attendees.map((a) =>
        a.memberId === memberId ? { ...a, present } : a
      ),
    })
  }

  const handleAdd = (memberId: string) => {
    if (!meeting || !attendees) return
    updateMeeting(meeting.id, {
      attendees: attendees.concat({
        memberId,
        circlesIds: [],
        present: null,
      }),
    })

    // Set user's current meeting
    startMembersMeeting([memberId], meeting.id)

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
        url,
      })
    }
  }

  const handleRemove = (memberId: string) => {
    if (!meeting || !attendees) return
    if (!confirm(t('MeetingAttendees.confirmRemove'))) return
    updateMeeting(meeting.id, {
      attendees: attendees.filter((a) => a.memberId !== memberId),
    })

    // Reset user's current meeting
    stopMembersMeeting([memberId], meeting.id)
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
