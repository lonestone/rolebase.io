import { createCircle } from '@api/entities/circles'
import { createRole } from '@api/entities/roles'
import { nameSchema } from '@api/schemas'
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

interface Props extends UseModalProps {
  parentId: string | null
  singleMember?: boolean
}

interface Values {
  name: string
}

const resolver = yupResolver(
  yup.object().shape({
    name: nameSchema,
  })
)

export default function CircleCreateModal({
  parentId,
  singleMember,
  ...modalProps
}: Props) {
  const navigateOrg = useNavigateOrg()
  const orgId = useStoreState((state) => state.orgs.currentId)
  const roles = useStoreState((state) => state.roles.entries)
  const circles = useStoreState((state) => state.circles.entries)
  const baseRoles = useMemo(
    () =>
      roles?.filter(
        (role) =>
          // Base role
          role.base &&
          (singleMember === undefined ||
            singleMember === role.singleMember ||
            false) &&
          // Not already used in same circle
          !circles?.some(
            (circle) =>
              circle.parentId === parentId && circle.roleId === role.id
          )
      ),
    [roles, circles, parentId]
  )

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver,
  })

  const handleCreateCircle = useCallback(
    async (roleId: string) => {
      if (!orgId) return
      modalProps.onClose()
      const circle = await createCircle({ orgId, roleId, parentId })
      navigateOrg(`?circleId=${circle.id}`)
    },
    [orgId, parentId]
  )

  const onSubmit = handleSubmit(async ({ name }) => {
    if (!orgId) return
    try {
      // Create role
      const role = await createRole({ orgId, base: false, name, singleMember })
      if (!role) throw new Error('Error creating new role')

      // Create circle
      handleCreateCircle(role.id)
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {singleMember ? 'Ajouter un Rôle' : 'Ajouter un Cercle'}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormControl isInvalid={!!errors.name} mb={10}>
              <FormLabel htmlFor="name">Nom :</FormLabel>
              <HStack>
                <Input {...register('name')} placeholder="Nom..." autoFocus />
                <Button colorScheme="blue" type="submit">
                  Créer
                </Button>
              </HStack>
            </FormControl>
          </form>

          {baseRoles && baseRoles.length > 0 && (
            <FormControl mb={5}>
              <FormLabel>Ou utiliser un rôle de base :</FormLabel>
              <VStack>
                {baseRoles &&
                  baseRoles?.map((role) => (
                    <Button
                      key={role.id}
                      onClick={() => handleCreateCircle(role.id)}
                    >
                      {role.name}
                    </Button>
                  ))}
              </VStack>
            </FormControl>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
