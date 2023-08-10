import PasswordConfirmInputDummy from '@atoms/PasswordConfirmInputDummy'
import PasswordInput from '@atoms/PasswordInput'
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
import { useChangeDisplayNameMutation } from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUserDisplayName, useUserEmail, useUserId } from '@nhost/react'
import { emailSchema, nameSchema } from '@shared/schemas'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { nhost } from 'src/nhost'
import * as yup from 'yup'

interface Values {
  name: string
  email: string
  ['new-password']: string
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema.required(),
    email: emailSchema.required(),
    ['new-password']: yup
      .string()
      .test(
        'length',
        'Password must be at least 8 characters',
        (value) =>
          value === undefined || value.length === 0 || value.length >= 8
      ),
  })
)

export default function CurrentUserModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const userId = useUserId()
  const userName = useUserDisplayName()
  const userEmail = useUserEmail()
  const toast = useToast()
  const [saving, setSaving] = useState(false)

  // Mutations
  const [changeDisplayName] = useChangeDisplayNameMutation()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver,
    defaultValues: {
      name: userName || '',
      email: userEmail || '',
      ['new-password']: '',
    },
  })

  const onSubmit = handleSubmit(
    async ({ name, email, 'new-password': password }) => {
      if (!userId) return
      setSaving(true)

      // Update display name
      if (name !== userName) {
        await changeDisplayName({ variables: { userId, displayName: name } })
      }

      // Update email
      if (email !== userEmail) {
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
                <FormLabel>{t('common.name')}</FormLabel>
                <Input
                  {...register('name')}
                  autoFocus
                  autoComplete="off"
                  data-lpignore="true"
                />
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>{t('CurrentUserModal.email')}</FormLabel>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder={t('CurrentUserModal.emailPlaceholder')}
                  autoComplete="off"
                  data-lpignore="true"
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
