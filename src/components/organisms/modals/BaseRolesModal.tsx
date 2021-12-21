import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackItem,
  useDisclosure,
  UseModalProps,
} from '@chakra-ui/react'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useState } from 'react'
import { FiEdit3, FiPlus, FiTrash2 } from 'react-icons/fi'
import BaseRoleCreateModal from './BaseRoleCreateModal'
import RoleDeleteModal from './RoleDeleteModal'
import RoleEditModal from './RoleEditModal'

export default function BaseRolesModal(props: UseModalProps) {
  const roles = useStoreState((state) => state.roles.entries)
  const baseRoles = useMemo(() => roles?.filter((role) => role.base), [roles])

  console.log(baseRoles)

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
    <>
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rôles de base de l'organisation</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
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
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button leftIcon={<FiPlus />} onClick={onCreateOpen}>
              Créer un nouveau rôle de base
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
    </>
  )
}
