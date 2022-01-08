import {
  IconButton,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  useDisclosure,
} from '@chakra-ui/react'
import BaseRolesModal from '@components/organisms/modals/BaseRolesModal'
import MeetingTemplatesModal from '@components/organisms/modals/MeetingTemplatesModal'
import OrgEditModal from '@components/organisms/modals/OrgEditModal'
import VacantRolesModal from '@components/organisms/modals/VacantRolesModal'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import React, { useState } from 'react'
import {
  FiArrowLeft,
  FiCircle,
  FiCopy,
  FiMenu,
  FiSettings,
  FiUsers,
} from 'react-icons/fi'
import { useHistory } from 'react-router'

export default function OrgMenu(props: MenuButtonProps) {
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

  // Base roles modal
  const {
    isOpen: isBaseRolesOpen,
    onOpen: onBaseRolesOpen,
    onClose: onBaseRolesClose,
  } = useDisclosure()

  // Vacant roles modal
  const {
    isOpen: isVacantRolesOpen,
    onOpen: onVacantRolesOpen,
    onClose: onVacantRolesClose,
  } = useDisclosure()

  // Meeting templates modal
  const {
    isOpen: isMeetingTemplatesOpen,
    onOpen: onMeetingTemplatesOpen,
    onClose: onMeetingTemplatesClose,
  } = useDisclosure()

  if (!org) return null
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        bg="transparent"
        icon={<FiMenu />}
        px={1}
        {...props}
      />
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
          <MenuItem icon={<FiCircle />} onClick={onBaseRolesOpen}>
            Rôles de base
          </MenuItem>
          <MenuItem icon={<FiCircle />} onClick={onVacantRolesOpen}>
            Rôles vacants
          </MenuItem>
          <MenuItem icon={<FiCopy />} onClick={onMeetingTemplatesOpen}>
            Templates de réunion
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<FiArrowLeft />} onClick={() => history.push('/')}>
            Toutes les organisations
          </MenuItem>
        </MenuList>
      </Portal>

      {isEditOpen && editOrgId && (
        <OrgEditModal id={editOrgId} isOpen onClose={onEditClose} />
      )}

      {isBaseRolesOpen && <BaseRolesModal isOpen onClose={onBaseRolesClose} />}

      {isVacantRolesOpen && (
        <VacantRolesModal isOpen onClose={onVacantRolesClose} />
      )}

      {isMeetingTemplatesOpen && (
        <MeetingTemplatesModal isOpen onClose={onMeetingTemplatesClose} />
      )}
    </Menu>
  )
}
