import { Center, Container, Heading, Link } from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { useStoreActions, useStoreState } from '../../store/hooks'
import Loading from '../atoms/Loading'
import TextErrors from '../atoms/TextErrors'
import SignupForm from '../organisms/SignupForm'

interface Props {
  goToLoginPage?(): void
}

export default function SignupPage({ goToLoginPage }: Props) {
  // const signinGoogle = useStoreActions((actions) => actions.auth.signinGoogle)
  const signup = useStoreActions((actions) => actions.auth.signup)
  const loading = useStoreState((state) => state.auth.loading)
  const error = useStoreState((state) => state.auth.error)

  return (
    <Container maxW="sm" marginTop="60px">
      <Heading size="md" mb={5}>
        Inscription
      </Heading>

      {/*
        <Button onClick={() => signinGoogle()}>Connexion avec Google</Button>
      */}

      <SignupForm onSubmit={signup} />

      <TextErrors errors={[error]} />
      <Loading active={loading} center />

      <Center mt={2}>
        {goToLoginPage ? (
          <Link onClick={goToLoginPage}>Connexion</Link>
        ) : (
          <Link to="/login" as={ReachLink} textDecoration="underline">
            Connexion
          </Link>
        )}
      </Center>
    </Container>
  )
}
