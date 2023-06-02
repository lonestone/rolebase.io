import {
  MenuItem,
  MenuList,
  MenuListProps,
  useDisclosure,
} from '@chakra-ui/react'
import { SidebarContext } from '@contexts/SidebarContext'
import useOrgAdmin from '@hooks/useOrgAdmin'
import { useOrgId } from '@hooks/useOrgId'
import useOrgOwner from '@hooks/useOrgOwner'
import { usePathInOrg } from '@hooks/usePathInOrg'
import useSuperAdmin from '@hooks/useSuperAdmin'
import OrgEditModal from '@organisms/org/OrgEditModal'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiActivity, FiClock, FiCreditCard, FiSettings } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function SettingsMenuList(props: MenuListProps) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const isAdmin = useOrgAdmin()
  const isSuperAdmin = useSuperAdmin()
  const isOwner = useOrgOwner()
  const sidebarContext = useContext(SidebarContext)

  // Pages paths
  const logsPath = usePathInOrg('logs')
  const subscriptionPath = usePathInOrg('subscription')

  // Modals
  const orgEditModal = useDisclosure()

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
    </>
  )
}
