import { Link, useDisclosure } from '@chakra-ui/react'
import MemberModal from '@components/organisms/modals/MemberModal'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props {
  member: MemberEntry
}

export default function MemberLink({ member }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleOpen = useNormalClickHandler(onOpen)

  return (
    <>
      <Link
        as={ReachLink}
        fontWeight="bold"
        textDecoration="none"
        to={`/orgs/${orgId}?memberId=${member.id}`}
        onClick={handleOpen}
      >
        {member.name}
      </Link>

      {isOpen && member && (
        <MemberModal id={member.id} isOpen onClose={onClose} />
      )}
    </>
  )
}
