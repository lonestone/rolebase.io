import {
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Select,
  Spacer,
  StackItem,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { CircleUpdate, updateCircle } from '../../api/entities/circles'
import Panel from '../common/Panel'
import RoleEditModal from '../roles/RoleEditModal'
import { useStoreState } from '../store/hooks'
import CircleDeleteModal from './CircleDeleteModal'

interface Props {
  id: string
  onClose(): void
}

export default function CirclePanel({ id, onClose }: Props) {
  const roles = useStoreState((state) => state.roles.entries)
  const getById = useStoreState((state) => state.circles.getById)
  const circle = useMemo(() => getById(id), [getById, id])

  const role = useMemo(() => {
    if (!circle || !roles) return undefined
    return roles.find((r) => r.id === circle.roleId)
  }, [circle, roles])

  // Role edit modal
  const {
    isOpen: isEditRoleOpen,
    onOpen: onEditRoleOpen,
    onClose: onEditRoleClose,
  } = useDisclosure()

  // Delete modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const {
    handleSubmit,
    register,
    formState: { isDirty },
    reset,
    watch,
  } = useForm<CircleUpdate>()

  const roleId = watch('roleId')

  // Init form data
  useEffect(() => {
    if (circle) {
      reset({ roleId: circle.roleId })
    }
  }, [circle])

  const onSubmit = handleSubmit(({ roleId }) => {
    updateCircle(id, { roleId })
    // onClose()
  })

  if (!circle || !role) return null

  return (
    <Panel>
      <form onSubmit={onSubmit}>
        <Heading size="sm" marginBottom={5}>
          <HStack spacing={5}>
            <StackItem>{role.name}</StackItem>
            <Spacer />
            <CloseButton onClick={onClose} />
          </HStack>
        </Heading>

        <FormControl marginBottom={5}>
          <FormLabel htmlFor="roleId">Changer le rôle :</FormLabel>
          <Select name="roleId" ref={register()} autoFocus>
            {roles?.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </Select>
          <Button onClick={onEditRoleOpen}>Editer</Button>
        </FormControl>

        <HStack spacing={5}>
          <Button colorScheme="red" variant="ghost" onClick={onDeleteOpen}>
            Supprimer
          </Button>
          <Spacer />
          {isDirty && (
            <Button colorScheme="blue" mr={3} type="submit">
              Enregistrer
            </Button>
          )}
        </HStack>
      </form>

      {roleId && (
        <RoleEditModal
          id={roleId}
          isOpen={isEditRoleOpen}
          onClose={onEditRoleClose}
        />
      )}

      <CircleDeleteModal
        id={id}
        onDelete={onClose}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </Panel>
  )
}
