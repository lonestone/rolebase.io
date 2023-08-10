import PasswordConfirmInputDummy from '@atoms/PasswordConfirmInputDummy'
import PasswordInput from '@atoms/PasswordInput'
import TextErrors from '@atoms/TextErrors'
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNhostClient, useSignUpEmailPassword } from '@nhost/react'
import { emailSchema, nameSchema } from '@shared/schemas'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

interface Props {
  defaultEmail?: string
}

export interface Values {
  name: string
  email: string
  password: string
}

const schema = yup.object().shape({
  name: nameSchema.required(),
  email: emailSchema.required(),
  password: yup.string().required(),
})

export default function SignupForm({ defaultEmail }: Props) {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const navigate = useNavigate()
  const { signUpEmailPassword, isLoading, error } = useSignUpEmailPassword()
  const { auth } = useNhostClient()

  const sendVerifyEmail = async (email: string) => {
    try {
      await auth.sendVerificationEmail({ email })
    } catch (error) {
      console.error('SENDING VERIFICATION EMAIL FAILED', error)
    }
  }

  const onSubmit = async (values: Values) => {
    // Sign up
    const { isSuccess, user } = await signUpEmailPassword(
      values.email,
      values.password,
      {
        displayName: values.name,
        locale: language.substring(0, 2),
      }
    )
    if (user && user.email && !user.emailVerified) {
      await sendVerifyEmail(user.email)
    }

    if (!isSuccess) return

    navigate('/')
  }

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
      <Heading as="h1" size="md" mb={7}>
        {t('SignupForm.heading')}
      </Heading>

      <VStack spacing={5}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>{t('SignupForm.name')}</FormLabel>
          <Input
            {...register('name')}
            type="name"
            required
            autoComplete="name"
          />
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>{t('SignupForm.email')}</FormLabel>
          <Input
            {...register('email')}
            type="email"
            required
            autoComplete="email"
          />
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>{t('SignupForm.password')}</FormLabel>
          <PasswordInput
            {...register('password')}
            required
            id="new-password"
            autoComplete="new-password"
          />
        </FormControl>

        <FormControl>
          <Checkbox
            name="terms"
            required
            sx={{ a: { textDecoration: 'underline' } }}
          >
            <div dangerouslySetInnerHTML={{ __html: t('SignupForm.terms') }} />
          </Checkbox>
        </FormControl>

        <PasswordConfirmInputDummy />
        <TextErrors errors={[error]} />
        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          {t('SignupForm.submit')}
        </Button>
      </VStack>
    </form>
  )
}
