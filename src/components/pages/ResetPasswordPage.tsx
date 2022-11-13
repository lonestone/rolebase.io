import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import { yupResolver } from '@hookform/resolvers/yup'
import useQueryParams from '@hooks/useQueryParams'
import { useResetPassword } from '@nhost/react'
import { emailSchema } from '@shared/schemas'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link as ReachLink } from 'react-router-dom'
import * as yup from 'yup'

type Params = {
  email: string
}

interface Values {
  email: string
}

const schema = yup.object().shape({
  email: emailSchema.required(),
})

export default function ResetPasswordPage() {
  const { t } = useTranslation()
  const queryParams = useQueryParams<Params>()
  const { resetPassword, isLoading, error, isSent } = useResetPassword()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: { email: queryParams.email || '' },
  })

  return (
    <Container
      maxW="xs"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Title>{t('ResetPasswordPage.heading')}</Title>

      <Heading size="md" mb={5}>
        {t('ResetPasswordPage.heading')}
      </Heading>

      {isSent ? (
        <Alert status="success">
          <AlertIcon />
          <AlertDescription>
            <p>{t('ResetPasswordPage.done1')}</p>
            <p>{t('ResetPasswordPage.done2')}</p>
          </AlertDescription>
        </Alert>
      ) : (
        <form
          onSubmit={handleSubmit(({ email }: Values) =>
            resetPassword(email, { redirectTo: '/user-info' })
          )}
        >
          <VStack spacing={5}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>{t('ResetPasswordPage.email')}</FormLabel>
              <Input
                {...register('email')}
                type="email"
                autoComplete="email"
                autoFocus
                required
              />
            </FormControl>

            <Button colorScheme="blue" type="submit" isDisabled={isLoading}>
              {t('ResetPasswordPage.reset')}
              {isLoading && <Spinner ml={2} />}
            </Button>
          </VStack>

          <TextErrors errors={[error]} />

          <Center mt={4}>
            <Link to="/login" as={ReachLink}>
              {t('ResetPasswordPage.signin')}
            </Link>
          </Center>
        </form>
      )}
    </Container>
  )
}
