import {
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  InputGroup,
  Select,
  Spacer,
  StackItem,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { CircleUpdate, updateCircle } from '../../api/entities/circles'
import useCircle from '../../hooks/useCircle'
import Markdown from '../common/Markdown'
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
  const circle = useCircle(id)

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

  const handleReset = () => circle && reset({ roleId: circle.roleId })

  // Init form data
  useEffect(() => {
    if (circle) {
      handleReset()
    }
  }, [circle])

  const onSubmit = handleSubmit(({ roleId }) => {
    updateCircle(id, { roleId })
    // onClose()
  })

  if (!circle) return null

  return (
    <Panel>
      <form onSubmit={onSubmit}>
        <Heading size="sm" marginBottom={5}>
          <HStack spacing={5}>
            <StackItem>Cercle {role?.name || '?'}</StackItem>
            <Spacer />
            <CloseButton onClick={onClose} />
          </HStack>
        </Heading>

        <VStack spacing={5}>
          {role?.purpose && (
            <FormControl>
              <FormLabel>Raison d'être :</FormLabel>
              <Markdown fontSize="xl">{role.purpose}</Markdown>
            </FormControl>
          )}

          {role?.domain && (
            <FormControl>
              <FormLabel>Domaine :</FormLabel>
              <Markdown>{role.domain}</Markdown>
            </FormControl>
          )}

          {role?.accountabilities && (
            <FormControl>
              <FormLabel>Redevabilités :</FormLabel>
              <Markdown>{role.accountabilities}</Markdown>
            </FormControl>
          )}

          {role?.notes && (
            <FormControl>
              <FormLabel>Notes :</FormLabel>
              <Markdown>{role.notes}</Markdown>
            </FormControl>
          )}

          <FormControl>
            <FormLabel htmlFor="roleId">Rôle :</FormLabel>
            <InputGroup>
              <Select name="roleId" ref={register()} autoFocus>
                {roles?.map((r) => (
                  <option
                    key={r.id}
                    value={r.id}
                    style={{
                      fontWeight: r.id === role?.id ? 'bold' : 'normal',
                    }}
                  >
                    {r.name}
                  </option>
                ))}
              </Select>
              <Button onClick={onEditRoleOpen}>Editer</Button>
            </InputGroup>
            {isDirty && (
              <>
                <Button colorScheme="blue" mt={2} type="submit">
                  Enregistrer
                </Button>
                <Button variant="ghost" mt={2} onClick={handleReset}>
                  Annuler
                </Button>
              </>
            )}
          </FormControl>

          <HStack spacing={5}>
            <Spacer />
            <Button colorScheme="red" variant="ghost" onClick={onDeleteOpen}>
              Supprimer
            </Button>
          </HStack>
        </VStack>
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
