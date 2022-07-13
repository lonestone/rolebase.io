import { updateUser } from '@api/entities/users'
import { emailSchema, nameSchema } from '@api/schemas'
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
import PasswordConfirmInputDummy from '@components/atoms/PasswordConfirmInputDummy'
import PasswordInput from '@components/atoms/PasswordInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStoreState } from '@store/hooks'
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Values {
  name: string
  email: string
  password: string
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
    email: emailSchema,
    password: yup
      .string()
      .test(
        'length',
        'Password must be at least 6 characters',
        (value) =>
          value === undefined || value.length === 0 || value.length >= 6
      ),
  })
)

export default function CurrentUserModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const firebaseUser = useStoreState((state) => state.auth.firebaseUser)
  const user = useStoreState((state) => state.auth.user)
  const toast = useToast()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver,
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    if (!user || !firebaseUser) return

    // Update user in firestore
    updateUser(user.id, {
      name,
      email,
    })

    // Update display name in firebase auth
    if (name !== firebaseUser.displayName) {
      updateProfile(firebaseUser, { displayName: name })
    }

    // Update email in firebase auth
    if (email !== firebaseUser.email) {
      updateEmail(firebaseUser, email)
    }

    // Update password in firebase auth
    if (password) {
      updatePassword(firebaseUser, password)
    }

    toast({
      title: t('organisms.modals.CurrentUserModal.toastSuccess'),
      status: 'success',
      duration: 2000,
    })

    modalProps.onClose()
  })

  if (!user || !firebaseUser) return null

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>
            {t('organisms.modals.CurrentUserModal.heading')}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>{t('common.name')}</FormLabel>
                <Input
                  {...register('name')}
                  placeholder={t('common.namePlaceholder')}
                  autoFocus
                  autoComplete="off"
                  data-lpignore="true"
                />
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>
                  {t('organisms.modals.CurrentUserModal.email')}
                </FormLabel>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder={t(
                    'organisms.modals.CurrentUserModal.emailPlaceholder'
                  )}
                  autoComplete="off"
                  data-lpignore="true"
                />
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>
                  {t('organisms.modals.CurrentUserModal.password')}
                </FormLabel>
                <PasswordInput
                  {...register('password')}
                  placeholder={t(
                    'organisms.modals.CurrentUserModal.passwordPlaceholder'
                  )}
                  autoComplete="new-password"
                />
              </FormControl>

              <PasswordConfirmInputDummy />

              <Box textAlign="right">
                <Button colorScheme="blue" type="submit">
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
