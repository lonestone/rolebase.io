import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useDisclosure,
} from '@chakra-ui/react'
import OrgEditModal from '@components/organisms/modals/OrgEditModal'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import React, { useState } from 'react'
import {
  FiArrowLeft,
  FiCircle,
  FiMenu,
  FiSettings,
  FiUsers,
} from 'react-icons/fi'
import { useHistory } from 'react-router'

export default function OrgMenu() {
  const org = useCurrentOrg()
  const navigateOrg = useNavigateOrg()
  const history = useHistory()

  // Edit modal
  const [editOrgId, setEditOrgId] = useState<string | undefined>()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  const handleOpenEdit = (id: string) => {
    setEditOrgId(id)
    onEditOpen()
  }

  if (!org) return null
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<FiMenu />} px={1} />
      <Portal>
        <MenuList zIndex={10} shadow="lg">
          <MenuItem
            icon={<FiSettings />}
            onClick={() => handleOpenEdit(org.id)}
          >
            Paramètres
          </MenuItem>
          <MenuItem icon={<FiUsers />} onClick={() => navigateOrg('/members')}>
            Membres
          </MenuItem>
          <MenuItem
            icon={<FiCircle />}
            onClick={() => navigateOrg('?baseRoles')}
          >
            Rôles de base
          </MenuItem>
          <MenuItem icon={<FiArrowLeft />} onClick={() => history.push('/')}>
            Toutes les organisations
          </MenuItem>
        </MenuList>
      </Portal>

      {isEditOpen && editOrgId && (
        <OrgEditModal id={editOrgId} isOpen onClose={onEditClose} />
      )}
    </Menu>
  )
}
