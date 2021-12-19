import { createRole, roleCreateSchema } from '@api/entities/roles'
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
import { Role } from '@shared/role'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'

interface Props extends UseModalProps {
  onCreate?: (id: string) => void
}

export default function BaseRoleCreateModal(props: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Role>({
    resolver: yupResolver(roleCreateSchema),
  })

  const onSubmit = handleSubmit(async ({ name }) => {
    if (orgId) {
      const role = await createRole({
        orgId,
        base: true,
        name,
        singleMember: true,
      })
      props.onCreate?.(role.id)
    }
    props.onClose()
  })

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Créer un rôle de base</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nom</FormLabel>
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
