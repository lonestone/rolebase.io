import { auth } from '@api/firebase'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useDisclosure,
} from '@chakra-ui/react'
import MemberModal from '@components/organisms/modals/MemberModal'
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

  const {
    isOpen: isMemberOpen,
    onOpen: onMemberOpen,
    onClose: onMemberClose,
  } = useDisclosure()

  if (!user) return null
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" size="sm" px={1}>
        <Avatar name={name} src={picture || undefined} size="xs" />
      </MenuButton>
      <Portal>
        <MenuList zIndex={10} shadow="lg">
          {member && (
            <MenuItem onClick={onMemberOpen}>Ma fiche membre</MenuItem>
          )}
          <MenuItem onClick={() => auth.signOut()}>Déconnexion</MenuItem>
        </MenuList>
      </Portal>

      {isMemberOpen && member && (
        <MemberModal id={member.id} isOpen onClose={onMemberClose} />
      )}
    </Menu>
  )
}
