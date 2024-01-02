import CircleMemberLink from '@atoms/CircleMemberLink'
import IconTextButton from '@atoms/IconTextButton'
import MemberButton from '@atoms/MemberButton'
import { BoxProps, ButtonGroup, Flex, IconButton } from '@chakra-ui/react'
import { MeetingAttendeeFragment, MemberSummaryFragment } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck, FiX } from 'react-icons/fi'

interface Props extends BoxProps {
  attendee: MeetingAttendeeFragment
  member: MemberSummaryFragment
  editable?: boolean
  onPresentChange?(present: boolean | null): void
  onRemove?(): void
}

export default function MeetingAttendeeItem({
  attendee,
  member,
  editable,
  onPresentChange,
  onRemove,
  ...boxProps
}: Props) {
  const { t } = useTranslation()

  if (!member) return null

  return (
    <Flex key={member.id} {...boxProps}>
      <ButtonGroup
        size="sm"
        variant="ghost"
        isAttached
        isDisabled={!editable}
        mr={3}
        border="1px solid"
        borderRadius="md"
        borderColor="gray.200"
        _dark={{ borderColor: 'whiteAlpha.400' }}
      >
        <IconTextButton
          aria-label={t('MeetingAttendees.maybe')}
          pt="2px"
          icon={<>?</>}
          colorScheme="gray"
          cursor={editable ? 'pointer' : 'default'}
          _disabled={{ opacity: 1 }}
          isActive={attendee.present === null}
          onClick={() => onPresentChange?.(null)}
        />

        <IconTextButton
          aria-label={t('MeetingAttendees.absent')}
          icon={<FiX />}
          colorScheme="red"
          cursor={editable ? 'pointer' : 'default'}
          _disabled={{ opacity: 1 }}
          isActive={attendee.present === false}
          onClick={() => onPresentChange?.(false)}
        />

        <IconTextButton
          aria-label={t('MeetingAttendees.present')}
          icon={<FiCheck />}
          colorScheme="green"
          cursor={editable ? 'pointer' : 'default'}
          _disabled={{ opacity: 1 }}
          isActive={attendee.present === true}
          onClick={() => onPresentChange?.(true)}
        />
      </ButtonGroup>

      <CircleMemberLink
        memberId={member.id}
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
                onRemove?.()
              }}
            />
          )}
        </ButtonGroup>
      </CircleMemberLink>
    </Flex>
  )
}
