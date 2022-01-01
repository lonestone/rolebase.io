import { useDisclosure } from '@chakra-ui/react'
import MemberModal from '@components/organisms/modals/MemberModal'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import React, { useCallback, useState } from 'react'
import SearchCombobox from './SearchCombobox'
import { SearchItem, SearchItemTypes } from './searchItems'

export default function Search() {
  const navigateOrg = useNavigateOrg()

  // Member edit modal
  const [memberId, setMemberId] = useState<string | undefined>()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const handleSelect = useCallback((item: SearchItem) => {
    if (item.type === SearchItemTypes.Member) {
      setMemberId(item.member.id)
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

      {memberId && (
        <MemberModal id={memberId} isOpen={isEditOpen} onClose={onEditClose} />
      )}
    </>
  )
}
