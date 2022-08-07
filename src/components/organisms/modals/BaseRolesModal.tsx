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
  Text,
  useDisclosure,
  UseModalProps,
} from '@chakra-ui/react'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import ListItemWithButtons from '../../molecules/ListItemWithButtons'
import BaseRoleCreateModal from './BaseRoleCreateModal'
import RoleDeleteModal from './RoleDeleteModal'
import RoleEditModal from './RoleEditModal'

export default function BaseRolesModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
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
          <ModalHeader>
            {t('organisms.modals.BaseRolesModal.heading')}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {!baseRoles?.length ? (
              <Text fontStyle="italic">
                {t('organisms.modals.BaseRolesModal.empty')}
              </Text>
            ) : (
              baseRoles?.map((role) => (
                <ListItemWithButtons
                  key={role.id}
                  title={role.name}
                  onClick={() => handleEdit(role.id)}
                  buttons={
                    <IconButton
                      aria-label={t('common.remove')}
                      size="sm"
                      variant="ghost"
                      zIndex={2}
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
              {t('organisms.modals.BaseRolesModal.create')}
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
