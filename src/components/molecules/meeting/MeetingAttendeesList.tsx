import {
  sendNotification,
  startMembersMeeting,
  stopMembersMeeting,
} from '@api/functions'
import { BoxProps, VStack } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useUpdateMeetingMutation } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import { MeetingAttendee } from '@shared/model/meeting'
import { NotificationCategories } from '@shared/model/notification'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import settings from 'src/settings'
import MemberSearchButton from '../search/entities/members/MemberSearchButton'
import MeetingAttendeeItem from './MeetingAttendeeItem'

export default function MeetingAttendeesList(boxProps: BoxProps) {
  const { meeting, circle, editable, path, isStarted } =
    useContext(MeetingContext)!
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const [updateMeeting] = useUpdateMeetingMutation()

  // Attendees state for optimistic UI
  // and to handle multiple updates in a short time
  const [attendees, setAttendees] = useState(meeting?.attendees)
  useEffect(() => {
    setAttendees(meeting?.attendees)
  }, [meeting?.attendees])

  const attendeesMemberIds = useMemo(
    () => attendees?.map((a) => a.memberId) || [],
    [attendees]
  )

  const updateAttendees = (attendees: MeetingAttendee[]) => {
    if (!meeting) return
    setAttendees(attendees)
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
    if (isStarted) {
      startMembersMeeting({
        membersIds: [memberId],
        meetingId: meeting.id,
      })
    }

    // Send notification
    if (isStarted && circle && currentMember && currentMember.id !== memberId) {
      const notifParams = {
        role: circle.role.name,
        title: meeting.title,
        sender: currentMember.name,
      }
      sendNotification({
        category: NotificationCategories.MeetingStarted,
        title: t('notifications.MeetingStarted.title', notifParams),
        content: t('notifications.MeetingStarted.content', notifParams),
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
          variant="outline"
          leftIcon={<FiPlus />}
          onSelect={handleAdd}
        >
          {t('MeetingAttendees.add')}
        </MemberSearchButton>
      )}
    </VStack>
  )
}
