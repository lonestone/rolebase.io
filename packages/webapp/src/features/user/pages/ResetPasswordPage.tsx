import BrandModal from '@/common/atoms/BrandModal'
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
  useToast,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { emailSchema } from '@rolebase/shared/schemas'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { nhost } from 'src/nhost'
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
  const toast = useToast()

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

  const handleClose = () => navigate(email ? `/login?email=${email}` : '/login')

  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const onSubmit = async ({ email }: Values) => {
    setIsLoading(true)
    try {
      await nhost.auth.sendPasswordResetEmail({
        email,
        options: {
          redirectTo: `${window.location.origin}/user-info`,
        },
      })
      setIsSent(true)
    } catch (error: any) {
      toast({
        title: error?.response?.data || error?.message || t('common.error'),
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      )}
    </BrandModal>
  )
}
