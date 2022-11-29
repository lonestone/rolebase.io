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
import ListItemWithButtons from '@components/molecules/ListItemWithButtons'
import { useStoreState } from '@store/hooks'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import BaseRoleCreateModal from './BaseRoleCreateModal'
import RoleDeleteModal from './RoleDeleteModal'
import RoleEditModal from './RoleEditModal'

export default function BaseRolesModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const roles = useStoreState((state) => state.roles.entries)
  const baseRoles = useMemo(() => roles?.filter((role) => role.base), [roles])

  // Modals
  const [roleId, setRoleId] = useState<string | undefined>()
  const editModal = useDisclosure()
  const createModal = useDisclosure()
  const deleteModal = useDisclosure()

  const handleEdit = (id: string) => {
    setRoleId(id)
    editModal.onOpen()
  }

  const handleDelete = (id: string) => {
    setRoleId(id)
    deleteModal.onOpen()
  }

  return (
    <>
      <Modal size="sm" {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('BaseRolesModal.heading')}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {!baseRoles?.length ? (
              <Text fontStyle="italic">{t('BaseRolesModal.empty')}</Text>
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
            <Button leftIcon={<FiPlus />} onClick={createModal.onOpen}>
              {t('BaseRolesModal.create')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {createModal.isOpen && (
        <BaseRoleCreateModal
          isOpen
          onClose={createModal.onClose}
          onCreate={(id) => handleEdit(id)}
        />
      )}

      {editModal.isOpen &&
        roleId &&
        roles?.some((role) => role.id === roleId) && (
          <RoleEditModal id={roleId} isOpen onClose={editModal.onClose} />
        )}

      {deleteModal.isOpen && roleId && (
        <RoleDeleteModal id={roleId} isOpen onClose={deleteModal.onClose} />
      )}
    </>
  )
}
