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
import { Org } from '@shared/org'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createCircle } from '../../api/entities/circles'
import { createRole } from '../../api/entities/roles'
import { createMember } from '../../api/entities/members'
import { createOrg, orgCreateSchema } from '../../api/entities/orgs'
import { useStoreState } from '../store/hooks'

interface Props extends UseModalProps {}

export default function OrgCreateModal(props: Props) {
  const user = useStoreState((state) => state.auth.user)

  const { handleSubmit, errors, register } = useForm<Org>({
    resolver: yupResolver(orgCreateSchema),
  })

  const onSubmit = handleSubmit(async ({ name }) => {
    if (!user) {
      console.error('User not logged in')
      return
    }
    props.onClose()

    // Create org
    const org = await createOrg(name, user.id)

    // Create member
    await createMember({
      orgId: org.id,
      userId: user.id,
      name: user.name,
    })

    // Create role
    const role = await createRole(org.id, false, name)

    // Create circle
    await createCircle(org.id, role.id, null)
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
