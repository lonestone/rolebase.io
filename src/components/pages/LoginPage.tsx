import { Center, Container, Heading, Link } from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import Loading from '../common/Loading'
import LoginForm from '../common/LoginForm'
import TextErrors from '../common/TextErrors'
import { useStoreActions, useStoreState } from '../store/hooks'

export default function LoginPage() {
  // const signinGoogle = useStoreActions((actions) => actions.auth.signinGoogle)
  const signinEmail = useStoreActions((actions) => actions.auth.signinEmail)
  const loading = useStoreState((state) => state.auth.loading)
  const error = useStoreState((state) => state.auth.error)

  return (
    <Container maxW="sm" marginTop="60px">
      <Heading size="md" mb={5}>
        Cercles &amp; Roles
      </Heading>

      {/*
        <Button onClick={() => signinGoogle()}>Connexion avec Google</Button>
      */}

      <LoginForm onSubmit={signinEmail} />

      <TextErrors errors={[error]} />
      <Loading active={loading} center />

      <Center mt={2}>
        <Link to="/signup" as={ReachLink} textDecoration="underline">
          Créer un compte
        </Link>
      </Center>
    </Container>
  )
}
