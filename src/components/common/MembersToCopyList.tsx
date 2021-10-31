import { VStack } from '@chakra-ui/layout'
import { Member, MemberEntry } from '@shared/members'
import uniqBy from 'lodash.uniqby'
import React, { useEffect, useState } from 'react'
import { getMembers } from '../../api/entities/members'
import { useStoreState } from '../store/hooks'
import MemberButton from './MemberButton'

interface Props {
  onClick(member: Member): void
}

export default function MembersToCopyList({ onClick }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const orgs = useStoreState((state) => state.orgs.entries)
  const members = useStoreState((state) => state.members.entries)
  const [membersToCopy, setMembersToCopy] = useState<MemberEntry[]>([])

  useEffect(() => {
    if (!orgId || !orgs || !members) return
    Promise.all(
      // Select all orgs other than current org
      orgs
        .filter((org) => org.id !== orgId)
        // Get members
        .map((org) => getMembers(org.id))
    )
      .then((orgsMembers) => {
        // Flatten list of member
        const otherOrgsMembers = orgsMembers
          .flat()
          // Filter out members whose names are already used in current org
          .filter((member) => !members.some((m) => member.name === m.name))
        // Return unique members by name
        return uniqBy(otherOrgsMembers, (m) => m.name)
      })
      .then(setMembersToCopy)
  }, [orgId, orgs, members])

  return (
    <VStack spacing={2} mb={3} align="start">
      {membersToCopy.map((member) => (
        <MemberButton
          key={member.id}
          member={member}
          onClick={() => onClick(member)}
        />
      ))}
    </VStack>
  )
}
