import { CloseIcon } from '@chakra-ui/icons'
import { ButtonGroup, IconButton, Wrap, WrapItem } from '@chakra-ui/react'
import MemberButton from '@components/atoms/MemberButton'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import SearchButtonCombobox from './search/SearchButtonCombobox'
import { SearchItem, SearchItemTypes } from './search/searchItems'

interface Props {
  membersIds: string[]
  max?: number
  onAdd(memberId: string): void
  onRemove(memberId: string): void
  onClick?(memberId: string): void
}

export default function MembersMultiSelect({
  membersIds,
  max,
  onAdd,
  onRemove,
  onClick,
}: Props) {
  const members = useStoreState((state) => state.members.entries)

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
          <ButtonGroup size="sm" isAttached>
            <MemberButton member={m} onClick={() => onClick && onClick(m.id)} />
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
            leftIcon={<FiPlus />}
            onSelect={handleAdd}
          >
            {max === 1 ? 'Choisir un membre' : 'Ajouter un membre'}
          </SearchButtonCombobox>
        </WrapItem>
      ) : null}
    </Wrap>
  )
}
