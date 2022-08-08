import {
  Circle,
  IconButton,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import OrgEditModal from '@components/organisms/org/OrgEditModal'
import BaseRolesModal from '@components/organisms/role/BaseRolesModal'
import VacantRolesModal from '@components/organisms/role/VacantRolesModal'
import useAdmin from '@hooks/useAdmin'
import { useOrgId } from '@hooks/useOrgId'
import { usePathInOrg } from '@hooks/usePathInOrg'
import useSuperAdmin from '@hooks/useSuperAdmin'
import React, { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiActivity,
  FiCircle,
  FiClock,
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
  alert?: boolean
}

interface Props extends MenuButtonProps {
  links?: HeaderLink[]
}

export default function HeaderLinksMenu({ links, ...props }: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const isAdmin = useAdmin()
  const isSuperAdmin = useSuperAdmin()

  // Pages paths
  const membersPath = usePathInOrg('members')
  const logsPath = usePathInOrg('logs')

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
          <MenuItem key={i} as={Link} to={link.to} icon={link.icon}>
            {link.label}
            {link.alert && (
              <Circle
                display="inline-block"
                ml={2}
                size="8px"
                bg="red.400"
                _dark={{ bg: 'red.600' }}
              />
            )}
          </MenuItem>
        ))}

        {isAdmin && (
          <MenuItem icon={<FiSettings />} onClick={() => handleOpenEdit(orgId)}>
            {t('HeaderLinksMenu.settings')}
          </MenuItem>
        )}

        <MenuItem as={Link} to={membersPath} icon={<FiUsers />}>
          {t('HeaderLinksMenu.members')}
        </MenuItem>
        <MenuItem icon={<FiCircle />} onClick={onBaseRolesOpen}>
          {t('HeaderLinksMenu.baseRoles')}
        </MenuItem>
        <MenuItem icon={<FiCircle />} onClick={onVacantRolesOpen}>
          {t('HeaderLinksMenu.vacantRoles')}
        </MenuItem>
        {isAdmin && (
          <MenuItem as={Link} to={logsPath} icon={<FiClock />}>
            {t('HeaderLinksMenu.logs')}
          </MenuItem>
        )}
        {isSuperAdmin && (
          <MenuItem as={Link} to={`/admin`} icon={<FiActivity />}>
            {t('HeaderLinksMenu.superAdmin')}
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
    </Menu>
  )
}
