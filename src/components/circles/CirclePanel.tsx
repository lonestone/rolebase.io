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
import {
  CircleUpdate,
  updateCircle,
  useContextCircle,
} from '../../api/entities/circles'
import { useContextRoles } from '../../api/entities/roles'
import Loading from '../common/Loading'
import Panel from '../common/Panel'
import TextErrors from '../common/TextErrors'
import CircleDeleteModal from './CircleDeleteModal'

interface Props {
  id: string
  onClose(): void
}

export default function CirclePanel({ id, onClose }: Props) {
  const [circle, circleLoading, circleError] = useContextCircle(id)
  const [roles, rolesLoading, rolesError] = useContextRoles()

  const role = useMemo(() => {
    if (!circle || !roles) return undefined
    return roles.find((r) => r.id === circle.roleId)
  }, [circle, roles])

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
  } = useForm<CircleUpdate>()

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

  return (
    <Panel>
      <form onSubmit={onSubmit}>
        <Heading size="sm" marginBottom={5}>
          <HStack spacing={5}>
            <StackItem>{role?.name}</StackItem>
            <Spacer />
            <CloseButton onClick={onClose} />
          </HStack>
        </Heading>

        <FormControl marginBottom={5}>
          <FormLabel htmlFor="roleId">Changer le rôle :</FormLabel>

          <Loading active={circleLoading || rolesLoading} />
          <TextErrors errors={[circleError, rolesError]} />

          {roles && (
            <Select name="roleId" ref={register()} autoFocus>
              {roles?.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Select>
          )}
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

      <CircleDeleteModal
        id={id}
        onDelete={onClose}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </Panel>
  )
}
