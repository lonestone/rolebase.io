import CircleMemberLink from '@/circle/components/CircleMemberLink'
import ThemeSwitch from '@/common/atoms/ThemeSwitch'
import useCurrentMember from '@/member/hooks/useCurrentMember'
import useOrgOwner from '@/member/hooks/useOrgOwner'
import { useOrgId } from '@/org/hooks/useOrgId'
import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import LangSelect from '@/user/components/LangSelect'
import useSuperAdmin from '@/user/hooks/useSuperAdmin'
import CurrentUserModal from '@/user/modals/CurrentUserModal'
import LangModal from '@/user/modals/LangModal'
import NotificationsSettingsModal from '@/user/modals/NotificationsSettingsModal'
import {
  BoxProps,
  Flex,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { useUserData } from '@nhost/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  AppsIcon,
  CurrentMemberIcon,
  MembersIcon,
  NotificationIcon,
  SubscriptionIcon,
  SuperAdminIcon,
  UserInfoIcon,
} from 'src/icons'

export default function SettingsMenuList({ children, ...boxProps }: BoxProps) {
  const { t } = useTranslation()
  const user = useUserData()
  const member = useCurrentMember()
  const orgId = useOrgId()
  const isOwner = useOrgOwner()
  const isSuperAdmin = useSuperAdmin()
  const rootPath = usePathInOrg('')

  const currentUserModal = useDisclosure()
  const notificationsModal = useDisclosure()
  const langModal = useDisclosure()

  if (!user) return null

  return (
    <MenuList zIndex={10} shadow="lg">
      {member && (
        <CircleMemberLink memberId={member.id}>
          <MenuItem icon={<CurrentMemberIcon size={20} />}>
            {t('SettingsMenu.member')}
          </MenuItem>
        </CircleMemberLink>
      )}

      <MenuItem
        icon={<UserInfoIcon size={20} />}
        onClick={currentUserModal.onOpen}
      >
        {t('SettingsMenu.user')}
      </MenuItem>

      <MenuItem
        icon={<NotificationIcon size={20} />}
        onClick={notificationsModal.onOpen}
      >
        {t('SettingsMenu.notifications')}
      </MenuItem>

      <Link to="apps">
        <MenuItem icon={<AppsIcon size={20} />}>
          {t('SettingsMenu.apps')}
        </MenuItem>
      </Link>

      {orgId && (
        <Link to={`${rootPath}members`}>
          <MenuItem icon={<MembersIcon size={20} />}>
            {t('SettingsMenu.members')}
          </MenuItem>
        </Link>
      )}

      {isOwner && (
        <Link to={`${rootPath}subscription`}>
          <MenuItem icon={<SubscriptionIcon size={20} />}>
            {t('SettingsMenu.subscription')}
          </MenuItem>
        </Link>
      )}

      {isSuperAdmin && (
        <Link to="admin">
          <MenuItem icon={<SuperAdminIcon size={20} />}>
            {t('SettingsMenu.superAdmin')}
          </MenuItem>
        </Link>
      )}

      <MenuDivider />
      <Flex
        py={1}
        pl={1}
        pr={3}
        mt={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <LangSelect />
        <ThemeSwitch />
      </Flex>

      {currentUserModal.isOpen && (
        <CurrentUserModal isOpen onClose={currentUserModal.onClose} />
      )}

      {notificationsModal.isOpen && (
        <NotificationsSettingsModal
          isOpen
          onClose={notificationsModal.onClose}
        />
      )}

      {langModal.isOpen && <LangModal isOpen onClose={langModal.onClose} />}
    </MenuList>
  )
}
