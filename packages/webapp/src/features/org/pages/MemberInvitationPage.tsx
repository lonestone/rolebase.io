import Loading from '@/common/atoms/Loading'
import useQueryParams from '@/common/hooks/useQueryParams'
import { Button, Heading, Text, VStack, useToast } from '@chakra-ui/react'
import { getOrgPath } from '@rolebase/shared/helpers/getOrgPath'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router'
import { trpc } from 'src/trpc'
import useOrg from '../hooks/useOrg'
import { useAuth } from '@/user/hooks/useAuth'
import BrandModal from '@/common/atoms/BrandModal'

type Params = {
  memberId: string
  token: string
}

export default function MemberInvitationPage() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const { orgId } = useParams<{ orgId: string }>()
  const { memberId, token } = useQueryParams<Params>()
  const toast = useToast()
  const storeOrg = useOrg(orgId)
  const [error, setError] = useState(false)
  const [isAccepting, setIsAccepting] = useState(false)
  const [orgName, setOrgName] = useState<string | undefined>(undefined)
  const [loadingInvitation, setLoadingInvitation] = useState(true)

  // Get org information for the invitation
  useEffect(() => {
    if (!isAuthenticated || !memberId || !token) return

    trpc.member.getMemberInvitationInfo
      .query({ memberId, token })
      .then((data) => {
        setOrgName(data.orgName)
        setLoadingInvitation(false)
      })
      .catch((error) => {
        console.error(error)
        setError(true)
        setLoadingInvitation(false)
      })
  }, [isAuthenticated, memberId, token])

  // Handle accept invitation
  const handleAccept = () => {
    if (!memberId || !token) return

    setIsAccepting(true)
    trpc.member.acceptMemberInvitation
      .mutate({ memberId, token })
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
        setError(true)
        setIsAccepting(false)
        toast({
          title: t('common.error'),
          description: error?.response?.data || error?.message || undefined,
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
  }

  // When org is joined and exist in the store, redirect to the org page
  if (storeOrg) {
    return <Navigate to={`${getOrgPath(storeOrg)}/`} />
  }

  // If error occurred, redirect to home
  if (error) {
    return <Navigate to="/" />
  }

  // Show loading while fetching org data
  if (loadingInvitation || !isAuthenticated) {
    return <Loading center active />
  }

  // Show modal with invitation details
  return (
    <BrandModal isOpen onClose={() => {}} size="md" backButton={false}>
      <VStack spacing={10} align="stretch">
        <Heading size="md" textAlign="center">
          {t('MemberInvitationPage.title', { orgName })}
        </Heading>

        <VStack spacing={3}>
          <Button
            colorScheme="blue"
            width="100%"
            onClick={handleAccept}
            isLoading={isAccepting}
          >
            {t('MemberInvitationPage.accept')}
          </Button>

          <Button
            variant="ghost"
            width="100%"
            onClick={() => (window.location.href = '/')}
            isDisabled={isAccepting}
          >
            {t('MemberInvitationPage.cancel')}
          </Button>
        </VStack>
      </VStack>
    </BrandModal>
  )
}
