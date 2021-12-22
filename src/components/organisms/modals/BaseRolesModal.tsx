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
  useDisclosure,
  UseModalProps,
} from '@chakra-ui/react'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useState } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import BaseRoleCreateModal from './BaseRoleCreateModal'
import ListItemWithButtons from './ListItemWithButtons'
import RoleDeleteModal from './RoleDeleteModal'
import RoleEditModal from './RoleEditModal'

export default function BaseRolesModal(modalProps: UseModalProps) {
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

  const handleEdit = (id: string) => {
    setRoleId(id)
    onEditOpen()
  }

  const handleDelete = (id: string) => {
    setRoleId(id)
    onDeleteOpen()
  }

  return (
    <>
      <Modal size="sm" {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rôles de base de l'organisation</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {!baseRoles?.length ? (
              <i>Aucun rôle de base</i>
            ) : (
              baseRoles?.map((role) => (
                <ListItemWithButtons
                  key={role.id}
                  title={role.name}
                  onClick={() => handleEdit(role.id)}
                  buttons={
                    <IconButton
                      aria-label=""
                      size="sm"
                      onClick={() => handleDelete(role.id)}
                      icon={<FiTrash2 />}
                    />
                  }
                />
              ))
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
          onCreate={(id) => handleEdit(id)}
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
