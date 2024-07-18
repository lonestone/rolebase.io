import PasswordInput from '@/common/atoms/PasswordInput'
import TextError from '@/common/atoms/TextError'
import { Title } from '@/common/atoms/Title'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSignInEmailPassword } from '@nhost/react'
import { emailSchema } from '@rolebase/shared/schemas'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link as ReachLink } from 'react-router-dom'
import * as yup from 'yup'

interface Props {
  defaultEmail?: string
}

export interface Values {
  email: string
  ['current-password']: string
}

const schema = yup.object().shape({
  email: emailSchema.required(),
  ['current-password']: yup.string().required(),
})

export default function LoginForm({ defaultEmail }: Props) {
  const { t } = useTranslation()

  const { signInEmailPassword, isLoading, error } = useSignInEmailPassword()

  const onSubmit = async (values: Values) => {
    await signInEmailPassword(values.email, values['current-password'])
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

        <FormControl isInvalid={!!errors['current-password']}>
          <FormLabel>{t('LoginForm.password')}</FormLabel>
          <PasswordInput
            {...register('current-password')}
            required
            autoComplete="current-password"
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

        {error && error.error !== 'invalid-refresh-token' && (
          <TextError error={error} />
        )}

        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          {t('LoginForm.submit')}
        </Button>
      </VStack>
    </form>
  )
}
