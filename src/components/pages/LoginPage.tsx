import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Center,
  Container,
  Heading,
  Link,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import BrandIcon from '@components/molecules/BrandIcon'
import LoginForm, { Values } from '@components/organisms/user/LoginForm'
import useQueryParams from '@hooks/useQueryParams'
import { useSendVerificationEmail, useSignInEmailPassword } from '@nhost/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck } from 'react-icons/fi'
import { Link as ReachLink, useLocation } from 'react-router-dom'
import SignupPage from './SignupPage'

type Params = {
  email: string
}

export default function LoginPage() {
  const { t } = useTranslation()
  const queryParams = useQueryParams<Params>()
  const path = useLocation().pathname

  const { signInEmailPassword, isLoading, error, needsEmailVerification } =
    useSignInEmailPassword()

  // Email verification
  const {
    sendEmail,
    isLoading: isEmailLoading,
    isSent,
  } = useSendVerificationEmail()
  const [email, setEmail] = useState<string | undefined>()

  // Signup form can be displayed without changing route, to preserve link to private page
  const isLoginRoute = path === '/' || path === '/login'
  const [signupPage, setSignupPage] = useState(false)

  const handleSubmit = async (values: Values) => {
    const { needsEmailVerification } = await signInEmailPassword(
      values.email,
      values.password
    )
    if (needsEmailVerification) {
      setEmail(values.email)
    }
  }

  if (signupPage) {
    return <SignupPage goToLoginPage={() => setSignupPage(false)} />
  }

  return (
    <Container
      maxW="xs"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading size="md" mb={10}>
        <BrandIcon />
      </Heading>

      {needsEmailVerification && (
        <Alert status="info" mb={3}>
          <AlertIcon />
          <AlertDescription>
            {t('LoginPage.needsEmailVerification')}
            <Button
              variant="link"
              colorScheme="blue"
              ml={3}
              isLoading={isEmailLoading}
              isDisabled={isSent}
              leftIcon={isSent ? <FiCheck /> : undefined}
              onClick={() => email && sendEmail(email)}
            >
              {t(isSent ? 'LoginPage.emailSent' : 'LoginPage.sendEmail')}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <LoginForm
        defaultEmail={queryParams.email || ''}
        onSubmit={handleSubmit}
      />

      <Loading active={isLoading} center />
      <TextErrors errors={[error]} />

      <Center mt={4}>
        {isLoginRoute ? (
          <Link to="/signup" as={ReachLink}>
            {t('LoginPage.signup')}
          </Link>
        ) : (
          <Link onClick={() => setSignupPage(true)}>
            {t('LoginPage.signup')}
          </Link>
        )}
      </Center>
    </Container>
  )
}
