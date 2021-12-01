import { Link } from '@chakra-ui/react'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props {
  member: MemberEntry
}

export default function MemberLink({ member }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  return (
    <Link
      as={ReachLink}
      to={member ? `/orgs/${orgId}/?memberId=${member.id}` : '#'}
      fontWeight="bold"
      textDecoration="none"
    >
      {member?.name || '[Utilisateur non membre]'}
    </Link>
  )
}
