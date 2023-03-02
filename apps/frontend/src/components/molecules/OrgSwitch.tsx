import { UpDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { SidebarContext } from '@contexts/SidebarContext'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useOrgId } from '@hooks/useOrgId'
import OrgCreateModal from '@organisms/org/OrgCreateModal'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { useStoreState } from '@store/hooks'
import { UserLocalStorageKeys } from '@utils/localStorage'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCircle, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function OrgSwitch(props: MenuButtonProps) {
  const { t } = useTranslation()
  const sidebarContext = useContext(SidebarContext)
  const orgId = useOrgId()
  const org = useCurrentOrg()
  const orgs = useStoreState((state) => state.orgs.entries)
  const sortedOrgs = orgs?.sort((a, b) => (a.name < b.name ? -1 : 1))
  const showName = org && org.id === orgId

  // Set orgId in localStorage
  const handleOrgClick = (orgId: string) => {
    localStorage.setItem(UserLocalStorageKeys.OrgId, orgId)
    sidebarContext?.expand.onClose()
  }

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        fontWeight="bold"
        display="block"
        h="auto"
        py={3}
        px={5}
        textAlign="left"
        whiteSpace="normal"
        borderRadius="none"
        opacity={showName ? 1 : 0}
        rightIcon={<UpDownIcon pt={1} opacity={0.6} />}
        {...props}
      >
        {showName ? org.name : ''}
      </MenuButton>

      <MenuList zIndex={10} shadow="lg" ml={2}>
        {sortedOrgs?.map((org) => (
          <Link
            key={org.id}
            to={getOrgPath(org)}
            onClick={() => handleOrgClick(org.id)}
          >
            <MenuItem icon={<FiCircle />}>{org.name}</MenuItem>
          </Link>
        ))}
        <MenuItem icon={<FiPlus />} onClick={onCreateOpen}>
          {t('OrgSwitch.create')}
        </MenuItem>
      </MenuList>

      {isCreateOpen && <OrgCreateModal isOpen onClose={onCreateClose} />}
    </Menu>
  )
}
