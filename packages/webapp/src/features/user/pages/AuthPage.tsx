import BrandModal from '@/common/atoms/BrandModal'
import ThemeSwitch from '@/common/atoms/ThemeSwitch'
import useQueryParams from '@/common/hooks/useQueryParams'
import { Alert, AlertIcon, Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import LangSelect from '../components/LangSelect'
import LoginForm from '../components/LoginForm'
import OtpForm from '../components/OtpForm'
import SignupForm from '../components/SignupForm'

export type AuthStep = 'otp' | 'login' | 'signup'

type Params = {
  email: string
  mode?: AuthStep
}

export default function AuthPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const queryParams = useQueryParams<Params>()
  const [mode, setMode] = useState<AuthStep>(queryParams.mode || 'otp')

  const isInvitationPage = location.pathname.includes('/invitation')

  return (
    <>
      <Flex
        position="absolute"
        zIndex={2000}
        top={4}
        right={4}
        gap={2}
        align="center"
      >
        <LangSelect />
        <ThemeSwitch />
      </Flex>

      <BrandModal
        size="lg"
        backButton={false}
        isOpen
        trapFocus={false /* Allow password managers to work */}
        closeOnEsc={false}
        onClose={() => history.back()}
      >
        {isInvitationPage && (
          <Alert status="info" mb={10} borderRadius="md">
            <AlertIcon />
            {t('AuthPage.invitationInfo')}
          </Alert>
        )}

        <Box mx={10}>
          {mode === 'otp' && (
            <OtpForm defaultEmail={queryParams.email} onStepChange={setMode} />
          )}
          {mode === 'login' && (
            <LoginForm
              defaultEmail={queryParams.email}
              onStepChange={setMode}
            />
          )}
          {mode === 'signup' && (
            <SignupForm
              defaultEmail={queryParams.email}
              onStepChange={setMode}
            />
          )}
        </Box>
      </BrandModal>
    </>
  )
}
