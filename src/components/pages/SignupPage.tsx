import { Center, Container, Heading, Link } from '@chakra-ui/react'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import SignupForm from '@components/organisms/SignupForm'
import { useStoreActions, useStoreState } from '@store/hooks'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props {
  goToLoginPage?(): void
}

export default function SignupPage({ goToLoginPage }: Props) {
  // const signinGoogle = useStoreActions((actions) => actions.auth.signinGoogle)
  const signup = useStoreActions((actions) => actions.auth.signup)
  const loading = useStoreState((state) => state.auth.loading)
  const error = useStoreState((state) => state.auth.error)

  return (
    <Container maxW="sm" mt="60px">
      <Title>Inscription</Title>

      <Heading size="md" mb={5}>
        Inscription
      </Heading>

      {/*
        <Button onClick={() => signinGoogle()}>Connexion avec Google</Button>
      */}

      <SignupForm onSubmit={signup} loading={loading} />

      <TextErrors errors={[error]} />

      <Center mt={4}>
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
