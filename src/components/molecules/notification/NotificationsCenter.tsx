import SidebarItem from '@atoms/SidebarItem'
import { useColorMode } from '@chakra-ui/react'
import {
  IMessage,
  PopoverNotificationCenter,
  useMarkNotificationsAs,
} from '@novu/notification-center'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { NotificationIcon } from 'src/icons'

interface Props {
  isMobile: boolean
}

export default function NotificationsCenter({ isMobile }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { colorMode } = useColorMode()

  // Hook needs to be in a NovuProvider instance to work
  const { markNotificationsAs } = useMarkNotificationsAs()

  const onNotificationClick = async (notification: IMessage) => {
    const url = notification.cta.data.url?.replace(
      /^https?:\/\/[^/]+(?=\/)/,
      ''
    )
    if (url) {
      navigate(url)
    }

    markNotificationsAs({
      messageId: notification?._id,
      seen: true,
      read: true,
    })
  }

  return (
    <PopoverNotificationCenter
      colorScheme={colorMode}
      onNotificationClick={onNotificationClick}
      position={isMobile ? 'top-start' : 'right-start'}
      offset={isMobile ? 0 : 20}
    >
      {({ unseenCount }) => (
        <SidebarItem
          className="userflow-sidebar-notifications"
          icon={NotificationIcon}
          alert={!!unseenCount}
        >
          {t('Notifications.tooltip')}
        </SidebarItem>
      )}
    </PopoverNotificationCenter>
  )
}
