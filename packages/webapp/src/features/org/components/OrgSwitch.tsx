import { SidebarContext } from '@/layout/contexts/SidebarContext'
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
import { getOrgPath } from '@rolebase/shared/helpers/getOrgPath'
import { useStoreState } from '@store/hooks'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { CreateIcon } from 'src/icons'
import useCurrentOrg from '../hooks/useCurrentOrg'
import { useOrgId } from '../hooks/useOrgId'
import OrgCreateModal from '../modals/OrgCreateModal'

export default function OrgSwitch(props: MenuButtonProps) {
  const { t } = useTranslation()
  const sidebarContext = useContext(SidebarContext)
  const orgId = useOrgId()
  const org = useCurrentOrg()
  const orgs = useStoreState((state) => state.orgs.entries)
  const sortedOrgs = orgs?.sort((a, b) => (a.name < b.name ? -1 : 1))
  const showName = org && org.id === orgId

  // Close sidebar on item click
  const handleCloseSidebar = () => {
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
        justifyContent="left"
        h="auto"
        py={3}
        pl={3}
        pr={2}
        textAlign="left"
        borderRadius="xl"
        opacity={showName ? 1 : 0}
        rightIcon={<UpDownIcon pt={1} opacity={0.6} />}
        sx={{
          'span:first-of-type': {
            flex: 1,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          },
        }}
        _hover={{
          bg: 'whiteAlpha.600',
        }}
        _active={{
          bg: 'white',
        }}
        _dark={{
          color: 'whiteAlpha.800',
          _hover: {
            bg: 'whiteAlpha.50',
          },
          _active: {
            color: 'white',
            bg: 'whiteAlpha.100',
          },
        }}
        {...props}
      >
        {showName ? org.name : ''}
      </MenuButton>

      <MenuList zIndex={10} shadow="lg">
        {sortedOrgs?.map((org) => (
          <Link
            key={org.id}
            to={`${getOrgPath(org)}/`}
            onClick={handleCloseSidebar}
          >
            <MenuItem>{org.name}</MenuItem>
          </Link>
        ))}
        <MenuItem icon={<CreateIcon size={20} />} onClick={onCreateOpen}>
          {t('OrgSwitch.create')}
        </MenuItem>
      </MenuList>

      {isCreateOpen && <OrgCreateModal isOpen onClose={onCreateClose} />}
    </Menu>
  )
}
