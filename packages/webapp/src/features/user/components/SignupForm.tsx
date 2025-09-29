import PasswordConfirmInputDummy from '@/common/atoms/PasswordConfirmInputDummy'
import PasswordInput from '@/common/atoms/PasswordInput'
import TextErrors from '@/common/atoms/TextErrors'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react'
import { useChangePhoneNumberMutation } from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNhostClient, useSignUpEmailPassword } from '@nhost/react'
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  phoneSchema,
} from '@rolebase/shared/schemas'
import { getTimeZone } from '@utils/dates'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link as ReachLink, useNavigate } from 'react-router-dom'
import { nhost } from 'src/nhost'

import * as yup from 'yup'

interface Props {
  defaultEmail?: string
}

const schema = yup.object().shape({
  name: nameSchema.required(),
  email: emailSchema.required(),
  phone: phoneSchema.required(),
  ['new-password']: passwordSchema.required(),
})

type Values = yup.InferType<typeof schema>

export default function SignupForm({ defaultEmail }: Props) {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const navigate = useNavigate()
  const { signUpEmailPassword, isLoading, error } = useSignUpEmailPassword()
  const { auth } = useNhostClient()
  const [changePhoneNumber] = useChangePhoneNumberMutation()

  const sendVerifyEmail = async (email: string) => {
    try {
      await auth.sendVerificationEmail({ email })
    } catch (error) {
      console.error('SENDING VERIFICATION EMAIL FAILED', error)
    }
  }

  const onSubmit = async ({
    name,
    email,
    phone,
    'new-password': password,
  }: Values) => {
    // Sign up
    const { isSuccess, user } = await signUpEmailPassword(email, password, {
      displayName: name,
      locale: language.substring(0, 2),
      metadata: {
        timezone: getTimeZone(),
      },
    })
    if (!isSuccess || !user) return

    if (user.email && !user.emailVerified) {
      await sendVerifyEmail(user.email)
    }

    // Save phone number
    await changePhoneNumber({
      variables: { userId: user.id, phoneNumber: phone },
    })

    // Refresh user data (necessary after phone change)
    await nhost.auth.refreshSession()

    navigate('/')
  }

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: defaultEmail,
      phone: '+33',
    },
  })

  const email = watch('email')

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

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>{t('SignupForm.phone')}</FormLabel>
          <Input
            {...register('phone')}
            type="phone"
            required
            autoComplete="phone"
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

        <FormControl isInvalid={!!errors['new-password']}>
          <FormLabel>{t('SignupForm.password')}</FormLabel>
          <PasswordInput
            {...register('new-password')}
            required
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

        <Box>
          {t('SignupForm.haveAccount')}
          <Link
            to={`/login${email ? `?email=${email}` : ''}`}
            as={ReachLink}
            ml={2}
          >
            {t('SignupForm.login')}
          </Link>
        </Box>
      </VStack>
    </form>
  )
}
