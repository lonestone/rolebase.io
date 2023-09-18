import { acceptMemberInvitation } from '@api/functions'
import Loading from '@atoms/Loading'
import { useToast } from '@chakra-ui/react'
import useOrg from '@hooks/useOrg'
import useQueryParams from '@hooks/useQueryParams'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router'

type Params = {
  memberId: string
  token: string
}

export default function MemberInvitationPage() {
  const { t } = useTranslation()
  const { orgId } = useParams<{ orgId: string }>()
  const { memberId, token } = useQueryParams<Params>()
  const toast = useToast()
  const storeOrg = useOrg(orgId)
  const [errorOccurred, setErrorOccurred] = useState(false)

  // Accept invitation
  useEffect(() => {
    if (!memberId || !token) return
    setTimeout(() => {
      acceptMemberInvitation({ memberId, token })
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
            description: error?.response?.data || error?.message || undefined,
            status: 'error',
            duration: 4000,
            isClosable: true,
          })
        })
    }, 2000) // Quick fix: wait for Nhost Auth to be ready
  }, [memberId, token])

  // When org is joined and exist in the store, redirect to the org page
  if (storeOrg) {
    return <Navigate to={`${getOrgPath(storeOrg)}/`} />
  } else if (errorOccurred) {
    return <Navigate to="/" />
  } else {
    return <Loading center active />
  }
}
