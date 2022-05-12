import {
  IconButton,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import BaseRolesModal from '@components/organisms/modals/BaseRolesModal'
import MeetingTemplatesModal from '@components/organisms/modals/MeetingTemplatesModal'
import OrgEditModal from '@components/organisms/modals/OrgEditModal'
import VacantRolesModal from '@components/organisms/modals/VacantRolesModal'
import { useOrgId } from '@hooks/useOrgId'
import { useOrgRole } from '@hooks/useOrgRole'
import { ClaimRole } from '@shared/model/userClaims'
import React, { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiCircle,
  FiClock,
  FiCopy,
  FiMoreVertical,
  FiSettings,
  FiUsers,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

export interface HeaderLink {
  to: string
  label: string
  icon: ReactElement
  exact?: boolean
  bg?: string
}

interface Props extends MenuButtonProps {
  links?: HeaderLink[]
}

export default function HeaderLinksMenu({ links, ...props }: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()
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
        icon={<FiMoreVertical />}
        variant="ghost"
        size="sm"
        px={1}
        {...props}
      />

      <MenuList zIndex={10} shadow="lg">
        {links?.map((link, i) => (
          <MenuItem
            key={i}
            as={Link}
            to={link.to}
            icon={link.icon}
            bg={link.bg}
          >
            {link.label}
          </MenuItem>
        ))}

        {role === ClaimRole.Admin && (
          <MenuItem icon={<FiSettings />} onClick={() => handleOpenEdit(orgId)}>
            {t('molecules.HeaderLinksMenu.settings')}
          </MenuItem>
        )}

        <MenuItem as={Link} to={`/orgs/${orgId}/members`} icon={<FiUsers />}>
          {t('molecules.HeaderLinksMenu.members')}
        </MenuItem>
        <MenuItem icon={<FiCircle />} onClick={onBaseRolesOpen}>
          {t('molecules.HeaderLinksMenu.baseRoles')}
        </MenuItem>
        <MenuItem icon={<FiCircle />} onClick={onVacantRolesOpen}>
          {t('molecules.HeaderLinksMenu.vacantRoles')}
        </MenuItem>
        <MenuItem icon={<FiCopy />} onClick={onMeetingTemplatesOpen}>
          {t('molecules.HeaderLinksMenu.meetingTemplates')}
        </MenuItem>
        {role === ClaimRole.Admin && (
          <MenuItem as={Link} to={`/orgs/${orgId}/logs`} icon={<FiClock />}>
            {t('molecules.HeaderLinksMenu.logs')}
          </MenuItem>
        )}
      </MenuList>

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
