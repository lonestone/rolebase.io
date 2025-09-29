import PasswordConfirmInputDummy from '@/common/atoms/PasswordConfirmInputDummy'
import PasswordInput from '@/common/atoms/PasswordInput'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
  useToast,
  VStack,
} from '@chakra-ui/react'
import {
  useChangeDisplayNameMutation,
  useChangePhoneNumberMutation,
} from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUserData } from '@nhost/react'
import { emailSchema, nameSchema, phoneSchema } from '@rolebase/shared/schemas'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { nhost } from 'src/nhost'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: nameSchema.required(),
  email: emailSchema.required(),
  phone: phoneSchema.required(),
  ['new-password']: yup
    .string()
    .test(
      'length',
      'Password must be at least 8 characters',
      (value) => value === undefined || value.length === 0 || value.length >= 8
    ),
})

type Values = yup.InferType<typeof schema>

export default function CurrentUserModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const user = useUserData()
  const toast = useToast()
  const [saving, setSaving] = useState(false)

  // Mutations
  const [changeDisplayName] = useChangeDisplayNameMutation()
  const [changePhoneNumber] = useChangePhoneNumberMutation()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      phone: user?.phoneNumber || '+33',
      ['new-password']: '',
    },
  })

  const onSubmit = handleSubmit(
    async ({ name, email, phone, 'new-password': password }) => {
      if (!user?.id) return
      setSaving(true)

      // Update display name
      if (name !== user?.displayName) {
        await changeDisplayName({
          variables: { userId: user.id, displayName: name },
        })
      }

      // Update phone number
      if (phone !== user?.phoneNumber) {
        await changePhoneNumber({
          variables: { userId: user.id, phoneNumber: phone },
        })
      }

      // Update email
      if (email !== user?.email) {
        await nhost.auth.changeEmail({ newEmail: email })
      }

      // Update password
      if (password) {
        await nhost.auth.changePassword({ newPassword: password })
      }

      // Refresh user data
      await nhost.auth.refreshSession()

      toast({
        title: t('CurrentUserModal.toastSuccess'),
        status: 'success',
        duration: 2000,
      })

      modalProps.onClose()
    }
  )

  return (
    <Modal
      trapFocus={false /* Allow password managers to work */}
      {...modalProps}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>{t('CurrentUserModal.heading')}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>{t('CurrentUserModal.name')}</FormLabel>
                <Input
                  {...register('name')}
                  autoFocus
                  autoComplete="off"
                  data-lpignore
                  data-1p-ignore
                />
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <FormLabel>{t('CurrentUserModal.phone')}</FormLabel>
                <Input {...register('phone')} type="phone" autoComplete="off" />
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>{t('CurrentUserModal.email')}</FormLabel>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder={t('CurrentUserModal.emailPlaceholder')}
                  autoComplete="off"
                  data-lpignore
                  data-1p-ignore
                />
              </FormControl>

              <FormControl isInvalid={!!errors['new-password']}>
                <FormLabel>{t('CurrentUserModal.password')}</FormLabel>
                <PasswordInput
                  {...register('new-password')}
                  placeholder={t('CurrentUserModal.passwordPlaceholder')}
                  autoComplete="new-password"
                />
              </FormControl>

              <PasswordConfirmInputDummy />

              <Box textAlign="right">
                <Button colorScheme="blue" type="submit" isLoading={saving}>
                  {t('common.save')}
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}
