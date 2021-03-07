import { Button, Container, Heading } from '@chakra-ui/react'
import React from 'react'
import Loading from '../common/Loading'
import TextErrors from '../common/TextErrors'
import { useStoreActions, useStoreState } from '../store/hooks'

export default function LoginPage() {
  const signinGoogle = useStoreActions((actions) => actions.auth.signinGoogle)
  const loading = useStoreState((state) => state.auth.loading)
  const error = useStoreState((state) => state.auth.error)

  return (
    <Container maxW="sm" marginTop="60px">
      <Heading size="md" mb={5}>
        Login
      </Heading>
      <Button onClick={() => signinGoogle()}>Connexion avec Google</Button>
      <TextErrors errors={[error]} />
      <Loading active={loading} center />
    </Container>
  )
}
