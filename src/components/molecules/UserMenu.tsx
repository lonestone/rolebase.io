import {
  Avatar,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  useButtonGroup,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import CircleMemberLink from '@components/atoms/CircleMemberLink'
import IconTextButton from '@components/atoms/IconTextButton'
import LangModal from '@components/organisms/layout/LangModal'
import CurrentUserModal from '@components/organisms/user/CurrentUserModal'
import useCurrentMember from '@hooks/useCurrentMember'
import useUserSignOut from '@hooks/useUserSignOut'
import { useUserData } from '@nhost/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiEdit3, FiLogOut, FiMoon, FiSun, FiUser } from 'react-icons/fi'
import { IoLanguage } from 'react-icons/io5'

export default function UserMenu(props: MenuButtonProps) {
  const { t } = useTranslation()
  const user = useUserData()
  const member = useCurrentMember()
  const signOut = useUserSignOut()
  const { colorMode, toggleColorMode } = useColorMode()

  const name = member?.name || user?.displayName || '?'
  const picture = member?.picture || user?.avatarUrl || '?'

  const currentUserModal = useDisclosure()
  const langModal = useDisclosure()
  const { size } = useButtonGroup()
  const avatarSize = size === 'sm' ? 'xs' : 'sm'

  if (!user) return null

  return (
    <Menu>
      <MenuButton
        as={IconTextButton}
        aria-label={t('UserMenu.settings')}
        {...props}
      >
        <Avatar name={name} src={picture || undefined} size={avatarSize} />
      </MenuButton>

      <MenuList zIndex={10} shadow="lg">
        {member && (
          <CircleMemberLink memberId={member.id}>
            <MenuItem icon={<FiUser />}>{t('UserMenu.member')}</MenuItem>
          </CircleMemberLink>
        )}

        <MenuItem icon={<FiEdit3 />} onClick={currentUserModal.onOpen}>
          {t('UserMenu.user')}
        </MenuItem>

        <MenuItem
          icon={colorMode === 'light' ? <FiSun /> : <FiMoon />}
          onClick={toggleColorMode}
        >
          {t('UserMenu.theme')}
        </MenuItem>

        <MenuItem icon={<IoLanguage />} onClick={langModal.onOpen}>
          {t('UserMenu.lang')}
        </MenuItem>

        <MenuItem icon={<FiLogOut />} onClick={signOut}>
          {t('UserMenu.signout')}
        </MenuItem>
      </MenuList>

      {currentUserModal.isOpen && (
        <CurrentUserModal isOpen onClose={currentUserModal.onClose} />
      )}

      {langModal.isOpen && <LangModal isOpen onClose={langModal.onClose} />}
    </Menu>
  )
}
