import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { ButtonGroup, IconButton, Wrap, WrapItem } from '@chakra-ui/react'
import MemberButton from '@components/atoms/MemberButton'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo } from 'react'
import SearchButtonCombobox from './search/SearchButtonCombobox'
import { SearchItem, SearchItemTypes } from './search/searchItems'

interface Props {
  membersIds: string[]
  max?: number
  onAdd(memberId: string): void
  onRemove(memberId: string): void
  onMemberClick?(memberId: string): void
}

export default function MembersSelect({
  membersIds,
  max,
  onAdd,
  onRemove,
  onMemberClick,
}: Props) {
  // Get members
  const members = useStoreState((state) => state.members.entries)
  const selectedMembers = useMemo(
    () =>
      membersIds
        .map((id) => members?.find((m) => m.id === id))
        .filter(Boolean) as MemberEntry[],
    [membersIds, members]
  )

  const handleAddMember = useCallback(
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
          <ButtonGroup size="sm" isAttached>
            <MemberButton
              member={m}
              onClick={() => onMemberClick && onMemberClick(m.id)}
            />
            <IconButton
              aria-label=""
              icon={<CloseIcon />}
              onClick={() => onRemove(m.id)}
            />
          </ButtonGroup>
        </WrapItem>
      ))}
      {!max || selectedMembers.length < max ? (
        <WrapItem>
          <SearchButtonCombobox
            members
            excludeIds={membersIds}
            size="sm"
            leftIcon={<AddIcon />}
            onSelect={handleAddMember}
          >
            Ajouter un membre
          </SearchButtonCombobox>
        </WrapItem>
      ) : null}
    </Wrap>
  )
}
