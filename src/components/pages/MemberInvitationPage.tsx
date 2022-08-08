import { acceptMemberInvitation } from '@api/entities/members'
import { useToast } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import useOrg from '@hooks/useOrg'
import useQueryParams from '@hooks/useQueryParams'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { useStoreActions } from '@store/hooks'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Redirect, useParams } from 'react-router'

type Params = {
  memberId: string
  token: string
}

export default function MemberInvitationPage() {
  const { t } = useTranslation()
  const { orgId } = useParams<{ orgId: string }>()
  const { memberId, token } = useQueryParams<Params>()
  const refreshClaims = useStoreActions((actions) => actions.auth.refreshClaims)
  const toast = useToast()
  const storeOrg = useOrg(orgId)
  const [errorOccurred, setErrorOccurred] = useState(false)

  // Accept invitation
  useEffect(() => {
    if (!memberId || !token) return
    acceptMemberInvitation(memberId, token)
      .then(() => refreshClaims())
      .then(() => {
        toast({
          title: t('MemberInvitationPage.toastSuccess'),
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((error) => {
        console.error(error, JSON.stringify(error))
        setErrorOccurred(true)
        toast({
          title: t('common.error'),
          description: error instanceof Error ? error.message : '',
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
  }, [memberId, token])

  // When org is joined and exist in the store, redirect to the org page
  if (storeOrg) {
    return <Redirect to={getOrgPath(storeOrg)} />
  } else if (errorOccurred) {
    return <Redirect to="/" />
  } else {
    return <Loading center active />
  }
}
