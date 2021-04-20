import { useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import MemberEditModal from '../components/members/MemberEditModal'
import { useNavigateOrg } from '../hooks/useNavigateOrg'
import Combobox from './Combobox'

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
    (memberId: string) => navigateOrg(`?memberId=${memberId}`),
    []
  )
  const handleCircleMemberSelected = useCallback(
    (circleId: string, memberId: string) =>
      navigateOrg(`?circleId=${circleId}&memberId=${memberId}`),
    []
  )

  return (
    <>
      <Combobox
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
