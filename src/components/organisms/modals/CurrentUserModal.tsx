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
import PasswordInput from '@components/atoms/PasswordInput'
import PasswordConfirmInputDummy from '@components/pages/PasswordConfirmInputDummy'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStoreState } from '@store/hooks'
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
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
      title: 'Informations mises à jour',
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
          <ModalHeader>Mes informations personnelles</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Nom</FormLabel>
                <Input
                  {...register('name')}
                  placeholder="Nom..."
                  autoFocus
                  autoComplete="off"
                  data-lpignore="true"
                />
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="Adresse email..."
                  autoComplete="off"
                  data-lpignore="true"
                />
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Modifier le mot de passe</FormLabel>
                <PasswordInput
                  {...register('password')}
                  placeholder="Nouveau mot de passe..."
                  autoComplete="new-password"
                />
              </FormControl>

              <PasswordConfirmInputDummy />

              <Box textAlign="right">
                <Button colorScheme="blue" type="submit">
                  Enregistrer
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}
