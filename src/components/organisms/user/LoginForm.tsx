import PasswordInput from '@atoms/PasswordInput'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSendVerificationEmail, useSignInEmailPassword } from '@nhost/react'
import { emailSchema } from '@shared/schemas'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiCheck } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'
import * as yup from 'yup'

interface Props {
  defaultEmail?: string
}

export interface Values {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: emailSchema.required(),
  password: yup.string().required(),
})

export default function LoginForm({ defaultEmail }: Props) {
  const { t } = useTranslation()

  const { signInEmailPassword, isLoading, error, needsEmailVerification } =
    useSignInEmailPassword()

  // Email verification
  const {
    sendEmail,
    isLoading: isEmailLoading,
    isSent,
  } = useSendVerificationEmail()
  const [verifEmail, setVerifEmail] = useState<string | undefined>()

  const onSubmit = async (values: Values) => {
    const { needsEmailVerification } = await signInEmailPassword(
      values.email,
      values.password
    )
    if (needsEmailVerification) {
      setVerifEmail(values.email)
    }
  }

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: { email: defaultEmail || '' },
  })

  const email = watch('email')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title>{t('LoginForm.heading')}</Title>

      <Heading as="h1" size="md" mb={7}>
        {t('LoginForm.heading')}
      </Heading>

      <VStack spacing={5}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>{t('LoginForm.email')}</FormLabel>
          <Input
            {...register('email')}
            type="email"
            required
            autoComplete="email"
            autoFocus
          />
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>{t('LoginForm.password')}</FormLabel>
          <PasswordInput
            {...register('password')}
            required
            autoComplete="password"
          />
          <Link
            to={`/reset-password${email ? `?email=${email}` : ''}`}
            as={ReachLink}
            fontSize="sm"
            color="gray.500"
            _dark={{ color: 'gray.300' }}
          >
            {t('LoginForm.resetPassword')}
          </Link>
        </FormControl>

        <TextErrors errors={[error]} />

        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          {t('LoginForm.submit')}
        </Button>

        {needsEmailVerification && (
          <Alert status="info" mb={3}>
            <AlertIcon />
            <AlertDescription>
              {t('LoginForm.needsEmailVerification')}
              <Button
                variant="link"
                colorScheme="blue"
                ml={3}
                isLoading={isEmailLoading}
                isDisabled={isSent}
                leftIcon={isSent ? <FiCheck /> : undefined}
                onClick={() => verifEmail && sendEmail(verifEmail)}
              >
                {t(isSent ? 'LoginForm.emailSent' : 'LoginForm.sendEmail')}
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </VStack>
    </form>
  )
}
