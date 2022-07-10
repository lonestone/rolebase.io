import { updateMeeting } from '@api/entities/meetings'
import {
  BoxProps,
  ButtonGroup,
  Flex,
  IconButton,
  Tooltip,
  useColorMode,
  VStack,
} from '@chakra-ui/react'
import CircleMemberLink from '@components/atoms/CircleMemberLink'
import MemberButton from '@components/atoms/MemberButton'
import { MeetingAttendee } from '@shared/model/meeting'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck, FiPlus, FiX } from 'react-icons/fi'
import MemberSearchButton from './search/entities/members/MemberSearchButton'

interface Props extends BoxProps {
  meetingId: string
  attendees: MeetingAttendee[]
  editable: boolean
}

export default function MeetingAttendees({
  meetingId,
  attendees,
  editable,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const members = useStoreState((state) => state.members.entries)

  const attendeesMemberIds = useMemo(
    () => attendees.map((a) => a.memberId),
    [attendees]
  )

  const handlePresentChange = (memberId: string, present: boolean | null) => {
    updateMeeting(meetingId, {
      attendees: attendees.map((a) =>
        a.memberId === memberId ? { ...a, present } : a
      ),
    })
  }

  const handleAdd = (memberId: string) => {
    updateMeeting(meetingId, {
      attendees: attendees.concat({
        memberId,
        circlesIds: [],
        present: null,
      }),
    })
  }

  const handleRemove = (memberId: string) => {
    if (!confirm(t('molecules.MeetingAttendees.confirmRemove'))) return
    updateMeeting(meetingId, {
      attendees: attendees.filter((a) => a.memberId !== memberId),
    })
  }

  return (
    <VStack align="start" {...boxProps}>
      {attendees.map(({ memberId, circlesIds, present }) => {
        const member = members?.find((m) => m.id === memberId)
        if (!member) return null
        // List of members buttons with "Maybe", "Absent", "Present" buttons on the left, and with close button on the right
        return (
          <Flex key={member.id}>
            <ButtonGroup
              size="sm"
              variant="ghost"
              isAttached
              isDisabled={!editable}
              mr={3}
              border="1px solid"
              borderColor={
                colorMode === 'light' ? 'gray.300' : 'whiteAlpha.400'
              }
              borderRadius="md"
            >
              <Tooltip
                label={t('molecules.MeetingAttendees.maybe')}
                placement="top"
                hasArrow
              >
                <IconButton
                  aria-label={t('molecules.MeetingAttendees.maybe')}
                  pt="2px"
                  icon={<>?</>}
                  colorScheme="gray"
                  cursor={editable ? 'pointer' : 'default'}
                  _disabled={{ opacity: 1 }}
                  isActive={present === null}
                  onClick={() => handlePresentChange(member.id, null)}
                />
              </Tooltip>

              <Tooltip
                label={t('molecules.MeetingAttendees.absent')}
                placement="top"
                hasArrow
              >
                <IconButton
                  aria-label={t('molecules.MeetingAttendees.absent')}
                  icon={<FiX />}
                  colorScheme="red"
                  cursor={editable ? 'pointer' : 'default'}
                  _disabled={{ opacity: 1 }}
                  isActive={present === false}
                  onClick={() => handlePresentChange(member.id, false)}
                />
              </Tooltip>

              <Tooltip
                label={t('molecules.MeetingAttendees.present')}
                placement="top"
                hasArrow
              >
                <IconButton
                  aria-label={t('molecules.MeetingAttendees.present')}
                  icon={<FiCheck />}
                  colorScheme="green"
                  cursor={editable ? 'pointer' : 'default'}
                  _disabled={{ opacity: 1 }}
                  isActive={present === true}
                  onClick={() => handlePresentChange(member.id, true)}
                />
              </Tooltip>
            </ButtonGroup>

            <CircleMemberLink
              memberId={member.id}
              circleId={circlesIds[0]}
              style={{ display: 'flex' }}
              tabIndex={-1}
            >
              <ButtonGroup variant="ghost" size="sm" isAttached>
                <MemberButton member={member} pr={editable ? 1 : undefined} />
                {editable && (
                  <IconButton
                    aria-label={t('common.remove')}
                    icon={<FiX />}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleRemove(member.id)
                    }}
                  />
                )}
              </ButtonGroup>
            </CircleMemberLink>
          </Flex>
        )
      })}

      {editable && (
        <MemberSearchButton
          excludeIds={attendeesMemberIds}
          size="sm"
          variant="ghost"
          leftIcon={<FiPlus />}
          onSelect={handleAdd}
        >
          {t('molecules.MeetingAttendees.add')}
        </MemberSearchButton>
      )}
    </VStack>
  )
}