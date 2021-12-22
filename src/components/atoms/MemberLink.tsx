import { Link, useDisclosure } from '@chakra-ui/react'
import MemberModal from '@components/organisms/modals/MemberModal'
import { MemberEntry } from '@shared/member'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props {
  member: MemberEntry
}

export default function MemberLink({ member }: Props) {
  // Member modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Link
        as={ReachLink}
        to="#"
        fontWeight="bold"
        textDecoration="none"
        onClick={(event) => {
          event.preventDefault()
          onOpen()
        }}
      >
        {member?.name || '[Utilisateur non membre]'}
      </Link>

      {isOpen && member && (
        <MemberModal id={member.id} isOpen onClose={onClose} />
      )}
    </>
  )
}
