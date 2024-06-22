import { SidebarContext } from '@/layout/contexts/SidebarContext'
import useUserSignOut from '@/user/hooks/useUserSignOut'
import { UpDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { getOrgPath } from '@rolebase/shared/helpers/getOrgPath'
import { useStoreState } from '@store/hooks'
import { UserLocalStorageKeys } from '@utils/localStorage'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, CreateIcon, LogoutIcon } from 'src/icons'
import useCurrentOrg from '../hooks/useCurrentOrg'
import { useOrgId } from '../hooks/useOrgId'
import OrgCreateModal from '../modals/OrgCreateModal'

export default function OrgSwitch(props: MenuButtonProps) {
  const { t } = useTranslation()
  const sidebarContext = useContext(SidebarContext)
  const signOut = useUserSignOut()
  const orgId = useOrgId()
  const org = useCurrentOrg()
  const orgs = useStoreState((state) => state.orgs.entries)
  const sortedOrgs = orgs?.sort((a, b) => (a.name < b.name ? -1 : 1))
  const showName = org && org.id === orgId

  const handleOrgClick = (orgId: string) => {
    localStorage.setItem(UserLocalStorageKeys.DefaultOrgId, orgId)
    // Close sidebar on item click
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
        <MenuGroup title={t('OrgSwitch.orgs')}>
          {sortedOrgs?.map((org) => (
            <Link
              key={org.id}
              to={`${getOrgPath(org)}/`}
              onClick={() => handleOrgClick(org.id)}
            >
              <MenuItem icon={<ArrowRightIcon size={20} />}>
                {org.name}
              </MenuItem>
            </Link>
          ))}
        </MenuGroup>
        <MenuItem icon={<CreateIcon size={20} />} onClick={onCreateOpen}>
          {t('OrgSwitch.create')}
        </MenuItem>

        <MenuDivider />

        <MenuItem icon={<LogoutIcon size={20} />} onClick={signOut}>
          {t('OrgSwitch.signout')}
        </MenuItem>
      </MenuList>

      {isCreateOpen && <OrgCreateModal isOpen onClose={onCreateClose} />}
    </Menu>
  )
}
