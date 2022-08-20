import { Center, Container, Heading, Link } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import SignupForm from '@components/organisms/user/SignupForm'
import useQueryParams from '@hooks/useQueryParams'
import { useStoreActions, useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReachLink } from 'react-router-dom'

type Params = {
  email: string
}

interface Props {
  goToLoginPage?(): void
}

export default function SignupPage({ goToLoginPage }: Props) {
  const { t } = useTranslation()
  const queryParams = useQueryParams<Params>()
  // const signinGoogle = useStoreActions((actions) => actions.auth.signinGoogle)
  const signup = useStoreActions((actions) => actions.auth.signup)
  const loading = useStoreState((state) => state.auth.loading)
  const error = useStoreState((state) => state.auth.error)

  return (
    <Container maxW="sm" mt="60px">
      <Title>{t('SignupPage.heading')}</Title>

      <Heading size="md" mb={5}>
        {t('SignupPage.heading')}
      </Heading>

      {/*
        <Button onClick={() => signinGoogle()}>Connexion avec Google</Button>
      */}

      <SignupForm
        defaultEmail={queryParams.email}
        loading={loading}
        onSubmit={signup}
      />

      <Loading active={loading} center />
      <TextErrors errors={[error]} />

      <Center mt={4}>
        {goToLoginPage ? (
          <Link onClick={goToLoginPage}>{t('SignupPage.signin')}</Link>
        ) : (
          <Link to="/login" as={ReachLink}>
            {t('SignupPage.signin')}
          </Link>
        )}
      </Center>
    </Container>
  )
}
