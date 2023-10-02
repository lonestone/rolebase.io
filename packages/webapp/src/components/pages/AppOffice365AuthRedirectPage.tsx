import { appsOffice365AuthRedirect } from '@api/apps'
import Loading from '@atoms/Loading'
import { Button, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BackIcon } from 'src/icons'

export default function AppOffice365AuthRedirectPage() {
  const [params] = useSearchParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const code = params.get('code')
    if (!code) return

    // Register app
    appsOffice365AuthRedirect({ code })
      .then(() => navigate('/apps'))
      .catch((error) => setError(error))
  }, [])

  if (error) {
    console.error(error)
    return (
      <VStack spacing={5} mt={5}>
        <Text fontWeight="bold">{t('AppOffice365AuthRedirectPage.error')}</Text>
        <Button
          leftIcon={<BackIcon />}
          variant="outline"
          onClick={() => navigate('/apps')}
        >
          {t('AppOffice365AuthRedirectPage.back')}
        </Button>
      </VStack>
    )
  }
  return <Loading active center />
}
