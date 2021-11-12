import { useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router'
import { acceptMemberInvitation } from '../../api/entities/members'
import useOrg from '../../hooks/useOrg'
import useQueryParams from '../../hooks/useQueryParams'
import Loading from '../atoms/Loading'

type Params = {
  memberId: string
  token: string
}

export default function MemberInvitationPage() {
  const { orgId } = useParams<{ orgId: string }>()
  const { memberId, token } = useQueryParams<Params>()
  const toast = useToast()
  const storeOrg = useOrg(orgId)
  const [errorOccurred, setErrorOccurred] = useState(false)

  // Accept invitation
  useEffect(() => {
    if (!memberId || !token) return
    acceptMemberInvitation(memberId, token)
      .then(() => {
        toast({
          title: 'Invitation acceptée',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((error) => {
        console.error(error, JSON.stringify(error))
        setErrorOccurred(true)
        toast({
          title: 'Erreur',
          description: error instanceof Error ? error.message : '',
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
  }, [memberId, token])

  // When org is joined and exist in the store, redirect to the org page
  if (storeOrg) {
    return <Redirect to={`/orgs/${storeOrg.id}`} />
  } else if (errorOccurred) {
    return <Redirect to="/" />
  } else {
    return <Loading center active />
  }
}
