import { auth } from '@api/firebase'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react'
import CircleMemberLink from '@components/atoms/CircleMemberLink'
import useCurrentMember from '@hooks/useCurrentMember'
import { useStoreState } from '@store/hooks'
import React from 'react'

export default function UserMenu(props: MenuButtonProps) {
  const user = useStoreState((state) => state.auth.user)
  const member = useCurrentMember()

  const { name, picture } = member || user || { name: '?', picture: '' }

  if (!user) return null
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" size="sm" px={1} {...props}>
        <Avatar name={name} src={picture || undefined} size="xs" />
      </MenuButton>
      <Portal>
        <MenuList zIndex={10} shadow="lg">
          {member && (
            <CircleMemberLink memberId={member.id}>
              <MenuItem>Ma fiche membre</MenuItem>
            </CircleMemberLink>
          )}
          <MenuItem onClick={() => auth.signOut()}>Déconnexion</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}
