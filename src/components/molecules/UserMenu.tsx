import CircleMemberLink from '@atoms/CircleMemberLink'
import MemberButton from '@atoms/MemberButton'
import {
  BoxProps,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useButtonGroup,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import useUserSignOut from '@hooks/useUserSignOut'
import { useUserData } from '@nhost/react'
import LangModal from '@organisms/layout/LangModal'
import CurrentUserModal from '@organisms/user/CurrentUserModal'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiChevronRight,
  FiEdit3,
  FiLogOut,
  FiMoon,
  FiSun,
  FiUser,
} from 'react-icons/fi'
import { IoLanguage } from 'react-icons/io5'

interface Props extends BoxProps {
  isMobile: boolean
}

export default function UserMenu({ isMobile, ...boxProps }: Props) {
  const { t } = useTranslation()
  const user = useUserData()
  const member = useCurrentMember()
  const signOut = useUserSignOut()
  const { colorMode, toggleColorMode } = useColorMode()

  const currentUserModal = useDisclosure()
  const langModal = useDisclosure()
  const buttonGroup = useButtonGroup()
  const size = buttonGroup?.size

  if (!user) return null

  return (
    <Flex {...boxProps}>
      <Menu placement={isMobile ? 'auto' : 'right-end'}>
        <MenuButton
          as={MemberButton}
          rightIcon={<FiChevronRight />}
          size={size}
          variant="ghost"
          w="100%"
          member={
            member || {
              name: user?.displayName || '?',
              picture: user?.avatarUrl || '?',
            }
          }
          maxNameLength={15}
        />

        <MenuList ml={-2} zIndex={10} shadow="lg">
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
    </Flex>
  )
}
