import { ButtonGroup, IconButton, VStack } from '@chakra-ui/react'
import CircleMemberLink from '@components/atoms/CircleMemberLink'
import MemberButton from '@components/atoms/MemberButton'
import { MemberEntry } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiX } from 'react-icons/fi'
import MemberSearchButton from './search/entities/members/MemberSearchButton'

interface Props {
  circleId?: string // Used for member link
  membersIds: string[]
  excludeMembersIds?: string[]
  max?: number
  onAdd(memberId: string): void
  onRemove(memberId: string): void
}

export default function MembersMultiSelect({
  circleId,
  membersIds,
  excludeMembersIds,
  max,
  onAdd,
  onRemove,
}: Props) {
  const { t } = useTranslation()
  const members = useStoreState((state) => state.members.entries)
  const excludeMembersIdsMemo = useMemo(
    () =>
      excludeMembersIds ? membersIds.concat(excludeMembersIds) : membersIds,
    [membersIds, excludeMembersIds]
  )

  // Get selected members
  const selectedMembers = useMemo(
    () =>
      membersIds
        .map((id) => members?.find((m) => m.id === id))
        .filter(Boolean) as MemberEntry[],
    [membersIds, members]
  )

  return (
    <VStack spacing={2} alignItems="start">
      {selectedMembers.map((m) => (
        <CircleMemberLink
          key={m.id}
          memberId={m.id}
          circleId={circleId}
          tabIndex={-1}
        >
          <ButtonGroup variant="ghost" size="sm" isAttached>
            <MemberButton member={m} pr={1} />
            <IconButton
              aria-label={t('common.remove')}
              icon={<FiX />}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onRemove(m.id)
              }}
            />
          </ButtonGroup>
        </CircleMemberLink>
      ))}

      {!max || selectedMembers.length < max ? (
        <MemberSearchButton
          excludeIds={excludeMembersIdsMemo}
          size="sm"
          variant="ghost"
          leftIcon={<FiPlus />}
          onSelect={onAdd}
        >
          {max === 1
            ? t(`MembersMultiSelect.choose`)
            : t(`MembersMultiSelect.add`)}
        </MemberSearchButton>
      ) : null}
    </VStack>
  )
}
