import { useDisclosure } from '@chakra-ui/react'
import MemberEditModal from '@components/organisms/modals/MemberEditModal'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import React, { useCallback, useState } from 'react'
import SearchCombobox from './SearchCombobox'
import { SearchItem, SearchItemTypes } from './searchItems'

export default function Search() {
  const navigateOrg = useNavigateOrg()

  // Member edit modal
  const [editMemberId, setEditMemberId] = useState<string | undefined>()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const handleSelect = useCallback((item: SearchItem) => {
    if (item.type === SearchItemTypes.Member) {
      setEditMemberId(item.member.id)
      onEditOpen()
    } else if (item.type === SearchItemTypes.Circle) {
      navigateOrg(`?circleId=${item.circle.id}`)
    } else if (item.type === SearchItemTypes.CircleMember) {
      navigateOrg(`?circleId=${item.circle.id}&memberId=${item.member.id}`)
    }
  }, [])

  return (
    <>
      <SearchCombobox onSelect={handleSelect} />

      {editMemberId && (
        <MemberEditModal
          id={editMemberId}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
    </>
  )
}
