import CircleAndParentsLinks from '@/circle/components/CircleAndParentsLinks'
import { CircleMemberContext } from '@/circle/contexts/CircleMemberContext'
import { Flex, IconButton, Tooltip } from '@chakra-ui/react'
import { CircleFullFragment } from '@gql'
import { Eye } from 'iconsax-react'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'

interface Props {
  memberId: string
  circle: CircleFullFragment
  hideActions?: boolean
  onDelete?(): void
  onFocus?(): void
}

export default function MemberRoleItem({
  memberId,
  circle,
  hideActions,
  onDelete,
  onFocus,
}: Props) {
  const { t } = useTranslation()
  const circleMemberContext = useContext(CircleMemberContext)
  const canFocus = circleMemberContext?.canFocus

  // Circle member data
  const circleMember = useMemo(
    () => circle.members.find((m) => m.member.id === memberId),
    [memberId, circle]
  )

  if (!circleMember) return null

  return (
    <Flex alignItems="center">
      <CircleAndParentsLinks circle={circle} flex={1} />

      {canFocus && !hideActions && (
        <Tooltip
          label={t('MemberRoleItem.focusTooltip', {
            role: circle.role.name,
          })}
          placement="top"
          hasArrow
        >
          <IconButton
            aria-label={''}
            icon={<Eye size={18} />}
            variant="ghost"
            size="sm"
            onClick={onFocus}
          />
        </Tooltip>
      )}

      {!hideActions && (
        <Tooltip
          label={t('MemberRoleItem.removeTooltip', {
            member: circleMember.member.name,
            role: circle.role.name,
          })}
          placement="top"
          hasArrow
        >
          <IconButton
            aria-label={t('common.remove')}
            icon={<FiX />}
            variant="ghost"
            size="sm"
            onClick={onDelete}
          />
        </Tooltip>
      )}
    </Flex>
  )
}
