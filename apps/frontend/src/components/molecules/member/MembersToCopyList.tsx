import MemberButton from '@atoms/MemberButton'
import { VStack } from '@chakra-ui/layout'
import { MemberFragment, useGetOrgsMembersLazyQuery } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import { useStoreState } from '@store/hooks'
import uniqBy from 'lodash.uniqby'
import React, { useEffect, useState } from 'react'

interface Props {
  onClick(member: MemberFragment): void
}

export default function MembersToCopyList({ onClick }: Props) {
  const orgId = useOrgId()
  const orgs = useStoreState((state) => state.orgs.entries)
  const members = useStoreState((state) => state.org.members)
  const [membersToCopy, setMembersToCopy] = useState<MemberFragment[]>([])
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
          ) as MemberFragment[] | undefined,
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
