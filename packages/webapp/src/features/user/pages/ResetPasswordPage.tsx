import BrandModal from '@/common/atoms/BrandModal'
import TextErrors from '@/common/atoms/TextErrors'
import { Title } from '@/common/atoms/Title'
import useQueryParams from '@/common/hooks/useQueryParams'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useResetPassword } from '@nhost/react'
import { emailSchema } from '@shared/schemas'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const { resetPassword, isLoading, error, isSent } = useResetPassword()

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: { email: queryParams.email || '' },
  })

  const email = watch('email')

  const handleClose = () => navigate(email ? `/?email=${email}` : '/')

  return (
    <BrandModal size="md" bodyProps={{ mx: 10 }} isOpen onClose={handleClose}>
      <Title>{t('ResetPasswordPage.heading')}</Title>

      <Heading as="h1" size="md" mb={7}>
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
          <VStack spacing={5} alignItems="start">
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
        </form>
      )}
    </BrandModal>
  )
}
