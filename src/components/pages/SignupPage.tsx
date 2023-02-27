import BrandIcon from '@atoms/BrandIcon'
import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import { Center, Container, Heading, Link } from '@chakra-ui/react'
import useQueryParams from '@hooks/useQueryParams'
import { useSendVerificationEmail, useSignUpEmailPassword } from '@nhost/react'
import SignupForm, { Values } from '@organisms/user/SignupForm'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReachLink, useNavigate } from 'react-router-dom'

type Params = {
  email: string
}

interface Props {
  goToLoginPage?(): void
}

export default function SignupPage({ goToLoginPage }: Props) {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const queryParams = useQueryParams<Params>()
  const navigate = useNavigate()
  const { signUpEmailPassword, isLoading, error } = useSignUpEmailPassword()
  const { sendEmail } = useSendVerificationEmail()

  const handleSubmit = async (values: Values) => {
    // Sign up
    const { isSuccess } = await signUpEmailPassword(
      values.email,
      values.password,
      {
        displayName: values.name,
        locale: language.substring(0, 2),
      }
    )
    if (!isSuccess) return

    navigate('/')

    // Send verification email
    await sendEmail(values.email)
  }

  return (
    <Container
      maxW="xs"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Title>{t('SignupPage.heading')}</Title>

      <BrandIcon />

      <Heading size="md" mt={10} mb={5}>
        {t('SignupPage.heading')}
      </Heading>

      <SignupForm
        defaultEmail={queryParams.email}
        loading={isLoading}
        onSubmit={handleSubmit}
      />

      <Loading active={isLoading} center />
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
