import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import OrgCreateModal from '@components/organisms/modals/OrgCreateModal'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useStoreState } from '@store/hooks'
import { orgIdKey } from '@store/orgs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiCircle, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function HeaderOrgMenu(props: MenuButtonProps) {
  const { t } = useTranslation()
  const org = useCurrentOrg()
  const orgs = useStoreState((state) => state.orgs.entries)
  const sortedOrgs = orgs?.sort((a, b) => (a.name < b.name ? -1 : 1))

  // Set orgId in localStorage
  const handleOrgClick = (orgId: string) => {
    localStorage.setItem(orgIdKey, orgId)
  }

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  if (!org || !orgs) return null
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        size="sm"
        fontWeight="bold"
        rightIcon={<ChevronDownIcon />}
        {...props}
      >
        {org.name}
      </MenuButton>

      <MenuList zIndex={10} shadow="lg">
        {sortedOrgs?.map((org) => (
          <Link
            key={org.id}
            to={`/orgs/${org.id}`}
            onClick={() => handleOrgClick(org.id)}
          >
            <MenuItem icon={<FiCircle />}>{org.name}</MenuItem>
          </Link>
        ))}
        <MenuItem icon={<FiPlus />} onClick={onCreateOpen}>
          {t('molecules.HeaderOrgMenu.create')}
        </MenuItem>
      </MenuList>

      {isCreateOpen && <OrgCreateModal isOpen onClose={onCreateClose} />}
    </Menu>
  )
}
