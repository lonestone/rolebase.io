import { createOrg } from '@api/entities/orgs'
import { nameSchema } from '@api/schemas'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStoreActions, useStoreState } from '@store/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

interface Values {
  name: string
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
  })
)

export default function OrgCreateModal(modalProps: UseModalProps) {
  const user = useStoreState((state) => state.auth.user)
  const refreshClaims = useStoreActions((actions) => actions.auth.refreshClaims)
  const history = useHistory()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver,
  })

  const onSubmit = handleSubmit(async ({ name }) => {
    if (!user) {
      console.error('User not logged in')
      return
    }
    modalProps.onClose()

    // Create org
    const orgId = await createOrg(name)

    // Refresh user claims
    await refreshClaims()

    history.push(`/orgs/${orgId}`)
  })

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Ajouter une organisation</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Nom</FormLabel>
              <Input {...register('name')} placeholder="Nom..." autoFocus />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit">
              Créer
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
