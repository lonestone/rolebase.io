import {
  Button,
  FormControl,
  FormErrorMessage,
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
import React from 'react'
import { useForm } from 'react-hook-form'
import { createRole, RoleCreate, roleCreateSchema } from '../../data/roles'

interface Props extends UseModalProps {}

export default function RoleCreateModal(props: Props) {
  const { handleSubmit, errors, register } = useForm<RoleCreate>({
    resolver: yupResolver(roleCreateSchema),
  })

  const onSubmit = handleSubmit(({ name }) => {
    createRole(name)
    props.onClose()
  })

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Ajouter un rôle</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nom</FormLabel>
              <Input
                name="name"
                placeholder="Nom..."
                ref={register()}
                autoFocus
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Créer
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
