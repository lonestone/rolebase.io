import { Box, Center, Container, Heading, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link as ReachLink, useLocation } from 'react-router-dom'
import Loading from '../common/Loading'
import LoginForm from '../common/LoginForm'
import TextErrors from '../common/TextErrors'
import { useStoreActions, useStoreState } from '../store/hooks'
import SignupPage from './SignupPage'

export default function LoginPage() {
  // const signinGoogle = useStoreActions((actions) => actions.auth.signinGoogle)
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
    <>
      <Loading active={loading} center />
      <Container
        maxW="sm"
        marginTop="60px"
        display={loading ? 'none' : 'block'}
      >
        <Heading size="md" mb={5}>
          Cercles &amp; Roles
        </Heading>

        {/*
          <Button onClick={() => signinGoogle()}>Connexion avec Google</Button>
        */}

        <LoginForm onSubmit={signinEmail} />

        <Box textAlign="center">
          <TextErrors errors={[error]} />
        </Box>

        <Center mt={2}>
          {isLoginRoute ? (
            <Link to="/signup" as={ReachLink}>
              Créer un compte
            </Link>
          ) : (
            <Link onClick={() => setSignupPage(true)}>Créer un compte</Link>
          )}
        </Center>
      </Container>
    </>
  )
}
