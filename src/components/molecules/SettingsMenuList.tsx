import {
  MenuItem,
  MenuList,
  MenuListProps,
  useDisclosure,
} from '@chakra-ui/react'
import { SidebarContext } from '@contexts/SidebarContext'
import useOrgAdmin from '@hooks/useOrgAdmin'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import useOrgOwner from '@hooks/useOrgOwner'
import { usePathInOrg } from '@hooks/usePathInOrg'
import useSuperAdmin from '@hooks/useSuperAdmin'
import OrgEditModal from '@organisms/org/OrgEditModal'
import BaseRolesModal from '@organisms/role/BaseRolesModal'
import VacantRolesModal from '@organisms/role/VacantRolesModal'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiActivity,
  FiCircle,
  FiClock,
  FiCreditCard,
  FiSettings,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function SettingsMenuList(props: MenuListProps) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const isMember = useOrgMember()
  const isAdmin = useOrgAdmin()
  const isSuperAdmin = useSuperAdmin()
  const isOwner = useOrgOwner()
  const sidebarContext = useContext(SidebarContext)

  // Pages paths
  const logsPath = usePathInOrg('logs')
  const subscriptionPath = usePathInOrg('subscription')

  // Modals
  const orgEditModal = useDisclosure()
  const baseRolesModal = useDisclosure()
  const vacantRolesModal = useDisclosure()

  // Edit modal
  const [editOrgId, setEditOrgId] = useState<string | undefined>()
  const handleOpenEdit = (id: string) => {
    setEditOrgId(id)
    orgEditModal.onOpen()
  }

  if (!orgId) return null
  return (
    <>
      <MenuList zIndex={10} shadow="lg" {...props}>
        {isAdmin && (
          <MenuItem icon={<FiSettings />} onClick={() => handleOpenEdit(orgId)}>
            {t('SettingsMenuList.org')}
          </MenuItem>
        )}
        {isMember && (
          <>
            <MenuItem icon={<FiCircle />} onClick={baseRolesModal.onOpen}>
              {t('SettingsMenuList.baseRoles')}
            </MenuItem>
            <MenuItem icon={<FiCircle />} onClick={vacantRolesModal.onOpen}>
              {t('SettingsMenuList.vacantRoles')}
            </MenuItem>
          </>
        )}

        <MenuItem
          as={Link}
          to={logsPath}
          icon={<FiClock />}
          onClick={sidebarContext?.expand.onClose}
        >
          {t('SettingsMenuList.logs')}
        </MenuItem>

        {isOwner && (
          <MenuItem as={Link} icon={<FiCreditCard />} to={subscriptionPath}>
            {t('SettingsMenuList.subscription')}
          </MenuItem>
        )}

        {isSuperAdmin && (
          <MenuItem as={Link} to={`/admin`} icon={<FiActivity />}>
            {t('SettingsMenuList.superAdmin')}
          </MenuItem>
        )}
      </MenuList>

      {orgEditModal.isOpen && editOrgId && (
        <OrgEditModal id={editOrgId} isOpen onClose={orgEditModal.onClose} />
      )}

      {baseRolesModal.isOpen && (
        <BaseRolesModal isOpen onClose={baseRolesModal.onClose} />
      )}

      {vacantRolesModal.isOpen && (
        <VacantRolesModal isOpen onClose={vacantRolesModal.onClose} />
      )}
    </>
  )
}
