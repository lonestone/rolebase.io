import MemberButton from '@atoms/MemberButton'
import { VStack } from '@chakra-ui/layout'
import { useGetOrgsMembersLazyQuery } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import { Member, MemberEntry } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import uniqBy from 'lodash.uniqby'
import React, { useEffect, useState } from 'react'

interface Props {
  onClick(member: Member): void
}

export default function MembersToCopyList({ onClick }: Props) {
  const orgId = useOrgId()
  const orgs = useStoreState((state) => state.orgs.entries)
  const members = useStoreState((state) => state.members.entries)
  const [membersToCopy, setMembersToCopy] = useState<MemberEntry[]>([])
  const [getOrgsMembers] = useGetOrgsMembersLazyQuery()

  useEffect(() => {
    if (!orgId || !orgs || !members) return
    const orgsIds = orgs.filter((org) => org.id !== orgId).map((org) => org.id)

    getOrgsMembers({ variables: { orgsIds } })
      .then(({ data }) => {
        // Return unique members by name
        return uniqBy(
          // Filter out members whose names are already used in current org
          data?.member.filter(
            (member) => !members.some((m) => member.name === m.name)
          ) as MemberEntry[] | undefined,
          (m) => m.name
        )
      })
      .then(setMembersToCopy)
  }, [orgId, orgs, members])

  return (
    <VStack spacing={2} mb={3} align="start">
      {membersToCopy.map((member) => (
        <MemberButton
          key={member.id}
          member={member}
          variant="ghost"
          onClick={() => onClick(member)}
        />
      ))}
    </VStack>
  )
}
