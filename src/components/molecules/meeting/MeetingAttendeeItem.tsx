import CircleMemberLink from '@atoms/CircleMemberLink'
import IconTextButton from '@atoms/IconTextButton'
import MemberButton from '@atoms/MemberButton'
import {
  BoxProps,
  ButtonGroup,
  Flex,
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import useMember from '@hooks/useMember'
import { MeetingAttendee } from '@shared/model/meeting'
import { useTranslation } from 'react-i18next'
import { FiCheck, FiX } from 'react-icons/fi'

interface Props extends BoxProps {
  attendee: MeetingAttendee
  editable?: boolean
  onPresentChange?(present: boolean | null): void
  onRemove?(): void
}

export default function MeetingAttendeeItem({
  attendee,
  editable,
  onPresentChange,
  onRemove,
  ...boxProps
}: Props) {
  const member = useMember(attendee.memberId)
  const { colorMode } = useColorMode()
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
        borderColor={colorMode === 'light' ? 'gray.200' : 'whiteAlpha.400'}
        borderRadius="md"
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
        circleId={attendee.circlesIds[0]}
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
