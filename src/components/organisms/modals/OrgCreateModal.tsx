import { createCircle } from '@api/entities/circles'
import { createMember } from '@api/entities/members'
import { createOrg, orgCreateSchema } from '@api/entities/orgs'
import { createRole } from '@api/entities/roles'
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
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'

interface Props extends UseModalProps {}

interface Values {
  name: string
}

export default function OrgCreateModal(props: Props) {
  const user = useStoreState((state) => state.auth.user)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(orgCreateSchema),
  })

  const onSubmit = handleSubmit(async ({ name }) => {
    if (!user) {
      console.error('User not logged in')
      return
    }
    props.onClose()

    // Create org
    const org = await createOrg({ name, ownersIds: [user.id] })

    // Create member
    await createMember({
      orgId: org.id,
      userId: user.id,
      name: user.name,
    })

    // Create role
    const role = await createRole({ orgId: org.id, base: false, name })

    // Create circle
    await createCircle({ orgId: org.id, roleId: role.id, parentId: null })
  })

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Ajouter une organisation</ModalHeader>
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
