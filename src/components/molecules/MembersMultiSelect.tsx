import { CloseIcon } from '@chakra-ui/icons'
import { ButtonGroup, IconButton, Wrap, WrapItem } from '@chakra-ui/react'
import CircleMemberLink from '@components/atoms/CircleMemberLink'
import MemberButton from '@components/atoms/MemberButton'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import MemberSearchButton from './search/entities/members/MemberSearchButton'
import { SearchItem, SearchItemTypes } from './search/searchTypes'

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

  const handleAdd = useCallback(
    (item: SearchItem) => {
      if (item.type === SearchItemTypes.Member) {
        onAdd(item.member.id)
      }
    },
    [onAdd]
  )

  return (
    <Wrap spacing={2}>
      {selectedMembers.map((m) => (
        <WrapItem key={m.id}>
          <CircleMemberLink memberId={m.id} circleId={circleId}>
            <ButtonGroup size="sm" isAttached>
              <MemberButton member={m} />
              <IconButton
                aria-label=""
                icon={<CloseIcon />}
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
            leftIcon={<FiPlus />}
            onSelect={handleAdd}
          >
            {max === 1 ? 'Choisir un membre' : 'Ajouter un membre'}
          </MemberSearchButton>
        </WrapItem>
      ) : null}
    </Wrap>
  )
}
