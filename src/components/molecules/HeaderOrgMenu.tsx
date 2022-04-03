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
import { FiCircle, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function HeaderOrgMenu(props: MenuButtonProps) {
  const org = useCurrentOrg()
  const orgs = useStoreState((state) => state.orgs.entries)

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
        {orgs.map((org) => (
          <Link
            key={org.id}
            to={`/orgs/${org.id}`}
            onClick={() => handleOrgClick(org.id)}
          >
            <MenuItem icon={<FiCircle />}>{org.name}</MenuItem>
          </Link>
        ))}
        <MenuItem icon={<FiPlus />} onClick={onCreateOpen}>
          Créer une organisation
        </MenuItem>
      </MenuList>

      {isCreateOpen && <OrgCreateModal isOpen onClose={onCreateClose} />}
    </Menu>
  )
}
