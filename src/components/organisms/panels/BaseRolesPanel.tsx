import {
  Button,
  CloseButton,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  StackItem,
  useDisclosure,
} from '@chakra-ui/react'
import Panel from '@components/atoms/Panel'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useState } from 'react'
import { FiEdit3, FiPlus, FiTrash2 } from 'react-icons/fi'
import BaseRoleCreateModal from '../modals/BaseRoleCreateModal'
import RoleDeleteModal from '../modals/RoleDeleteModal'
import RoleEditModal from '../modals/RoleEditModal'

interface Props {
  onClose(): void
}

export default function BaseRolesPanel({ onClose }: Props) {
  const roles = useStoreState((state) => state.roles.entries)
  const baseRoles = useMemo(() => roles?.filter((role) => role.base), [roles])

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  // Delete modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  // Edit modal
  const [roleId, setRoleId] = useState<string | undefined>()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const handleOpenEdit = (id: string) => {
    setRoleId(id)
    onEditOpen()
  }

  const handleOpenDelete = (id: string) => {
    setRoleId(id)
    onDeleteOpen()
  }

  return (
    <Panel>
      <Heading size="md" mb={5}>
        <HStack spacing={5}>
          <StackItem>Rôles de base</StackItem>
          <Button leftIcon={<FiPlus />} onClick={onCreateOpen}>
            Créer
          </Button>
          <Spacer />
          <CloseButton onClick={onClose} />
        </HStack>
      </Heading>

      {!baseRoles?.length ? (
        <i>Aucun rôle de base</i>
      ) : (
        <Stack>
          {baseRoles?.map((role) => (
            <StackItem key={role.id}>
              {role.name}{' '}
              <IconButton
                aria-label=""
                size="sm"
                onClick={() => handleOpenEdit(role.id)}
                icon={<FiEdit3 />}
                ml={2}
              />
              <IconButton
                aria-label=""
                size="sm"
                onClick={() => handleOpenDelete(role.id)}
                icon={<FiTrash2 />}
                ml={2}
              />
            </StackItem>
          ))}
        </Stack>
      )}

      {isCreateOpen && (
        <BaseRoleCreateModal
          isOpen
          onClose={onCreateClose}
          onCreate={(id) => handleOpenEdit(id)}
        />
      )}

      {isEditOpen && roleId && (
        <RoleEditModal id={roleId} isOpen onClose={onEditClose} />
      )}

      {isDeleteOpen && roleId && (
        <RoleDeleteModal id={roleId} isOpen onClose={onDeleteClose} />
      )}
    </Panel>
  )
}
