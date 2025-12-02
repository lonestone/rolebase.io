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
import { yupResolver } from '@hookform/resolvers/yup'
import {
  emailSchema,
  nameSchema,
  passwordSchema,
} from '@rolebase/shared/schemas'
import { getTimeZone } from '@utils/dates'
import React, { useState } from 'react'
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
  ['new-password']: passwordSchema.required(),
})

type Values = yup.InferType<typeof schema>

export default function SignupForm({ defaultEmail }: Props) {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const onSubmit = async ({
    name,
    email,
    'new-password': password,
  }: Values) => {
    // Sign up
    try {
      setIsLoading(true)
      const { body } = await nhost.auth.signUpEmailPassword({
        email,
        password,
        options: {
          displayName: name,
          locale: language.substring(0, 2),
          metadata: {
            timezone: getTimeZone(),
          },
        },
      })
      if (!body.session?.user) return
      const { user } = body.session

      if (user.email && !user.emailVerified) {
        await nhost.auth.sendVerificationEmail({ email: user.email })
      }

      navigate('/')
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
    defaultValues: {
      email: defaultEmail,
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
