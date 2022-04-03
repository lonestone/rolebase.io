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
import useCircle from '@hooks/useCircle'
import useCreateLog from '@hooks/useCreateLog'
import { useOrgId } from '@hooks/useOrgId'
import { EntitiesChanges, EntityChangeType, LogType } from '@shared/log'
import { RoleEntry } from '@shared/role'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useContext, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { CircleMemberContext } from 'src/contexts/CircleMemberContext'
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
  const circleMemberContext = useContext(CircleMemberContext)
  const orgId = useOrgId()
  const roles = useStoreState((state) => state.roles.entries)
  const circles = useStoreState((state) => state.circles.entries)
  const parentCircle = useCircle(parentId ? parentId : undefined)
  const createLog = useCreateLog()

  // Usable base roles
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

  // Create circle and open it
  const handleCreateCircle = useCallback(
    async (role: RoleEntry, newRole?: boolean) => {
      if (!orgId) return
      modalProps.onClose()

      // Create circle
      const circle = await createCircle({ orgId, roleId: role.id, parentId })

      // Open new circle
      circleMemberContext?.goTo(circle.id)

      // Log changes
      const changes: EntitiesChanges = {
        circles: [
          { type: EntityChangeType.Create, id: circle.id, data: circle },
        ],
      }
      if (newRole) {
        changes.roles = [
          { type: EntityChangeType.Create, id: role.id, data: role },
        ]
      }
      createLog({
        display: {
          type: LogType.CircleCreate,
          id: circle.id,
          name: role.name,
          parentId: parentCircle?.id || null,
          parentName: parentCircle?.role.name || null,
        },
        changes,
      })
    },
    [orgId, parentId]
  )

  // Create role then create circle
  const onSubmit = handleSubmit(async ({ name }) => {
    if (!orgId) return
    try {
      // Create role
      const role = await createRole({
        orgId,
        base: false,
        name,
        singleMember: !!singleMember,
      })
      if (!role) throw new Error('Error creating new role')

      // Create circle
      handleCreateCircle(role, true)
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
              <FormLabel>Nom :</FormLabel>
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
                      onClick={() => handleCreateCircle(role)}
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
