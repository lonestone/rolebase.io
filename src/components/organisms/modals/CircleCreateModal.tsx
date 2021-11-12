import {
  Button,
  FormControl,
  FormErrorMessage,
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
import React, { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { createCircle } from '../../../api/entities/circles'
import { createRole, roleCreateSchema } from '../../../api/entities/roles'
import { useNavigateOrg } from '../../../hooks/useNavigateOrg'
import { useStoreState } from '../../../store/hooks'

interface Props extends UseModalProps {
  parentId: string | null
}

interface Values {
  name: string
}

export default function CircleCreateModal({ parentId, ...props }: Props) {
  const navigateOrg = useNavigateOrg()
  const orgId = useStoreState((state) => state.orgs.currentId)
  const roles = useStoreState((state) => state.roles.entries)
  const baseRoles = useMemo(() => roles?.filter((role) => role.base), [roles])

  const { handleSubmit, register, errors } = useForm<Values>({
    resolver: yupResolver(roleCreateSchema),
  })

  const handleCreateCircle = useCallback(
    async (roleId: string) => {
      if (!orgId) return
      props.onClose()
      const circle = await createCircle({ orgId, roleId, parentId })
      navigateOrg(`?circleId=${circle.id}`)
    },
    [orgId, parentId]
  )

  const onSubmit = handleSubmit(async ({ name }) => {
    if (!orgId) return
    try {
      // Create role
      const role = await createRole({ orgId, base: false, name })
      if (!role) throw new Error('Error creating new role')

      // Create circle
      handleCreateCircle(role.id)
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter un cercle</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormControl isInvalid={!!errors.name} mb={10}>
              <FormLabel htmlFor="name">Nom du nouveau rôle</FormLabel>
              <HStack>
                <Input
                  name="name"
                  placeholder="Nom..."
                  ref={register}
                  autoFocus
                />
                <Button colorScheme="blue" type="submit">
                  Créer
                </Button>
              </HStack>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
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
