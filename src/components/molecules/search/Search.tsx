import { useDisclosure } from '@chakra-ui/react'
import MemberEditModal from '@components/organisms/modals/MemberEditModal'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import React, { useCallback, useState } from 'react'
import SearchCombobox from './SearchCombobox'

export default function Search() {
  const navigateOrg = useNavigateOrg()

  // Member edit modal
  const [editMemberId, setEditMemberId] = useState<string | undefined>()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const handleMemberSelected = useCallback((memberId: string) => {
    setEditMemberId(memberId)
    onEditOpen()
  }, [])
  const handleCircleSelected = useCallback(
    (circleId: string) => navigateOrg(`?circleId=${circleId}`),
    []
  )
  const handleCircleMemberSelected = useCallback(
    (circleId: string, memberId: string) =>
      navigateOrg(`?circleId=${circleId}&memberId=${memberId}`),
    []
  )

  return (
    <>
      <SearchCombobox
        onMemberSelected={handleMemberSelected}
        onCircleSelected={handleCircleSelected}
        onCircleMemberSelected={handleCircleMemberSelected}
      />

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
