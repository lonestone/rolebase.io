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
import { emailSchema } from '@rolebase/shared/schemas'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link as ReachLink } from 'react-router-dom'
import { nhost } from 'src/nhost'
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

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const onSubmit = async (values: Values) => {
    try {
      setIsLoading(true)
      await nhost.auth.signInEmailPassword({
        email: values.email,
        password: values['current-password'],
      })
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
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

        {error && <TextError error={error} />}

        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          {t('LoginForm.submit')}
        </Button>

        <Link to={`/signup${email ? `?email=${email}` : ''}`} as={ReachLink}>
          {t('LoginForm.signup')}
        </Link>
      </VStack>
    </form>
  )
}
