import { Link, useDisclosure } from '@chakra-ui/react'
import MemberModal from '@components/organisms/modals/MemberModal'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React, { MouseEvent, useCallback } from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props {
  member: MemberEntry
}

export default function MemberLink({ member }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    // Normal click (not Ctrl+click or Cmd+click)
    if (!(event.ctrlKey || event.metaKey)) {
      // Prevent default link behavior
      event.preventDefault()
      // Open modal
      onOpen()
    }
  }, [])

  return (
    <>
      <Link
        as={ReachLink}
        fontWeight="bold"
        textDecoration="none"
        to={`/orgs/${orgId}?memberId=${member.id}`}
        onClick={handleOpen}
      >
        {member?.name || '[Utilisateur non membre]'}
      </Link>

      {isOpen && member && (
        <MemberModal id={member.id} isOpen onClose={onClose} />
      )}
    </>
  )
}
