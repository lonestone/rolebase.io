import { useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import MemberEditModal from '../components/members/MemberEditModal'
import { useNavigateToCircle } from '../hooks/useNavigateToCircle'
import { useNavigateToCircleMember } from '../hooks/useNavigateToCircleMember'
import Combobox from './Combobox'

export default function Search() {
  const handleCircleSelected = useNavigateToCircle()
  const handleCircleMemberSelected = useNavigateToCircleMember()

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
