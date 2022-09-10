import { Center, Container, Heading, Link } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import LoginForm from '@components/organisms/user/LoginForm'
import useQueryParams from '@hooks/useQueryParams'
import { useStoreActions, useStoreState } from '@store/hooks'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReachLink, useLocation } from 'react-router-dom'
import SignupPage from './SignupPage'

type Params = {
  email: string
}

export default function LoginPage() {
  const { t } = useTranslation()
  const queryParams = useQueryParams<Params>()
  const signinEmail = useStoreActions((actions) => actions.auth.signinEmail)
  const loading = useStoreState((state) => state.auth.loading)
  const error = useStoreState((state) => state.auth.error)
  const path = useLocation().pathname

  // Signup form can be displayed without changing route, to preserve link to private page
  const isLoginRoute = path === '/' || path === '/login'
  const [signupPage, setSignupPage] = useState(false)

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
      <Heading size="md" mb={5}>
        {t('LoginPage.heading')}
      </Heading>

      <LoginForm
        defaultEmail={queryParams.email || ''}
        onSubmit={signinEmail}
      />

      <Loading active={loading} center />
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
