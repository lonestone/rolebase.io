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
import useOrgAdmin from '@hooks/useOrgAdmin'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
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
  const isMember = useOrgMember()
  const isAdmin = useOrgAdmin()
  const isSuperAdmin = useSuperAdmin()

  // Pages paths
  const membersPath = usePathInOrg('members')
  const logsPath = usePathInOrg('logs')

  // Modals
  const editModal = useDisclosure()
  const baseRolesModal = useDisclosure()
  const vacantRolesModal = useDisclosure()

  // Edit modal
  const [editOrgId, setEditOrgId] = useState<string | undefined>()
  const handleOpenEdit = (id: string) => {
    setEditOrgId(id)
    editModal.onOpen()
  }

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

        {isMember && (
          <>
            <MenuItem icon={<FiCircle />} onClick={baseRolesModal.onOpen}>
              {t('HeaderLinksMenu.baseRoles')}
            </MenuItem>
            <MenuItem icon={<FiCircle />} onClick={vacantRolesModal.onOpen}>
              {t('HeaderLinksMenu.vacantRoles')}
            </MenuItem>
          </>
        )}

        <MenuItem as={Link} to={logsPath} icon={<FiClock />}>
          {t('HeaderLinksMenu.logs')}
        </MenuItem>

        {isSuperAdmin && (
          <MenuItem as={Link} to={`/admin`} icon={<FiActivity />}>
            {t('HeaderLinksMenu.superAdmin')}
          </MenuItem>
        )}
      </MenuList>

      {editModal.isOpen && editOrgId && (
        <OrgEditModal id={editOrgId} isOpen onClose={editModal.onClose} />
      )}

      {baseRolesModal.isOpen && (
        <BaseRolesModal isOpen onClose={baseRolesModal.onClose} />
      )}

      {vacantRolesModal.isOpen && (
        <VacantRolesModal isOpen onClose={vacantRolesModal.onClose} />
      )}
    </Menu>
  )
}
