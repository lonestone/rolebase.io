import { auth } from '@api/firebase'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { useStoreState } from '@store/hooks'
import React from 'react'

export default function UserMenu() {
  const user = useStoreState((state) => state.auth.user)
  const member = useCurrentMember()
  const navigateOrg = useNavigateOrg()
  const org = useCurrentOrg()

  const { name, picture } = member || user || { name: '?', picture: '' }

  console.log(user, member)
  if (!user) return null
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" size="sm" px={1}>
        <Avatar name={name} src={picture || undefined} size="xs" />
      </MenuButton>
      <Portal>
        <MenuList zIndex={10} shadow="lg">
          {org && member && (
            <MenuItem onClick={() => navigateOrg(`?memberId=${member.id}`)}>
              Mes rôles
            </MenuItem>
          )}
          <MenuItem onClick={() => auth.signOut()}>Déconnexion</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}
