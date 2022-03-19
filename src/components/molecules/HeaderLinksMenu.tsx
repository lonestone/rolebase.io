import {
  IconButton,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  Portal,
  useDisclosure,
} from '@chakra-ui/react'
import BaseRolesModal from '@components/organisms/modals/BaseRolesModal'
import MeetingTemplatesModal from '@components/organisms/modals/MeetingTemplatesModal'
import OrgEditModal from '@components/organisms/modals/OrgEditModal'
import VacantRolesModal from '@components/organisms/modals/VacantRolesModal'
import { useOrgRole } from '@hooks/useOrgRole'
import { ClaimRole } from '@shared/userClaims'
import { useStoreState } from '@store/hooks'
import React, { useState } from 'react'
import {
  FiCircle,
  FiClock,
  FiCopy,
  FiMoreHorizontal,
  FiSettings,
  FiUsers,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function HeaderLinksMenu(props: MenuButtonProps) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const role = useOrgRole()

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

  if (!orgId) return null
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        bg="transparent"
        icon={<FiMoreHorizontal />}
        px={1}
        {...props}
      />

      <Portal>
        <MenuList zIndex={10} shadow="lg">
          {role === ClaimRole.Admin && (
            <>
              <MenuItem
                icon={<FiSettings />}
                onClick={() => handleOpenEdit(orgId)}
              >
                Paramètres
              </MenuItem>
              <Link to={`/orgs/${orgId}/members`}>
                <MenuItem icon={<FiUsers />}>Membres</MenuItem>
              </Link>
            </>
          )}
          <MenuItem icon={<FiCircle />} onClick={onBaseRolesOpen}>
            Rôles de base
          </MenuItem>
          <MenuItem icon={<FiCircle />} onClick={onVacantRolesOpen}>
            Rôles vacants
          </MenuItem>
          <MenuItem icon={<FiCopy />} onClick={onMeetingTemplatesOpen}>
            Templates de réunion
          </MenuItem>
          {role === ClaimRole.Admin && (
            <Link to={`/orgs/${orgId}/logs`}>
              <MenuItem icon={<FiClock />}>Historique</MenuItem>
            </Link>
          )}
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