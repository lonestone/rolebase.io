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
import { RoleCreate } from '@shared/roles'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createRole, roleCreateSchema } from '../../api/entities/roles'
import { useStoreState } from '../store/hooks'

interface Props extends UseModalProps {
  onCreate?: (id: string) => void
}

export default function BaseRoleCreateModal(props: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  const { handleSubmit, errors, register } = useForm<RoleCreate>({
    resolver: yupResolver(roleCreateSchema),
  })

  const onSubmit = handleSubmit(async ({ name }) => {
    if (orgId) {
      const role = await createRole(orgId, true, name)
      props.onCreate?.(role.id)
    }
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
            <Button colorScheme="blue" type="submit">
              Créer
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
