import { ButtonGroup, IconButton, Wrap, WrapItem } from '@chakra-ui/react'
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
    <Wrap spacing={2}>
      {selectedMembers.map((m) => (
        <WrapItem key={m.id}>
          <CircleMemberLink memberId={m.id} circleId={circleId} tabIndex={-1}>
            <ButtonGroup variant="ghost" size="sm" isAttached>
              <MemberButton member={m} />
              <IconButton
                aria-label=""
                icon={<FiX />}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onRemove(m.id)
                }}
              />
            </ButtonGroup>
          </CircleMemberLink>
        </WrapItem>
      ))}

      {!max || selectedMembers.length < max ? (
        <WrapItem>
          <MemberSearchButton
            excludeIds={excludeMembersIdsMemo}
            size="sm"
            variant="ghost"
            leftIcon={<FiPlus />}
            onSelect={onAdd}
          >
            {max === 1
              ? t(`molecules.MembersMultiSelect.choose`)
              : t(`molecules.MembersMultiSelect.add`)}
          </MemberSearchButton>
        </WrapItem>
      ) : null}
    </Wrap>
  )
}
