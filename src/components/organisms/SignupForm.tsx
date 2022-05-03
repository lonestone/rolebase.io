import { emailSchema, nameSchema } from '@api/schemas'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import PasswordConfirmInputDummy from '@components/atoms/PasswordConfirmInputDummy'
import PasswordInput from '@components/atoms/PasswordInput'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Props {
  defaultEmail?: string
  loading?: boolean
  onSubmit(values: Values): void
}

interface Values {
  name: string
  email: string
  password: string
}

const schema = yup.object().shape({
  name: nameSchema,
  email: emailSchema,
  password: yup.string().required(),
})

export default function SignupForm({ defaultEmail, loading, onSubmit }: Props) {
  const { t } = useTranslation()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: { email: defaultEmail },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={5}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>{t('organisms.SignupForm.name')}</FormLabel>
          <Input
            {...register('name')}
            type="name"
            required
            placeholder={t('organisms.SignupForm.namePlaceholder')}
            autoComplete="name"
            autoFocus
          />
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>{t('organisms.SignupForm.email')}</FormLabel>
          <Input
            {...register('email')}
            type="email"
            required
            placeholder={t('organisms.SignupForm.emailPlaceholder')}
            autoComplete="email"
          />
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>{t('organisms.SignupForm.password')}</FormLabel>
          <PasswordInput
            {...register('password')}
            required
            placeholder={t('organisms.SignupForm.passwordPlaceholder')}
            autoComplete="new-password"
          />
        </FormControl>

        <PasswordConfirmInputDummy />

        <Button colorScheme="blue" type="submit" isDisabled={loading}>
          {t('organisms.SignupForm.signup')}
          {loading && <Spinner ml={2} />}
        </Button>
      </VStack>
    </form>
  )
}
