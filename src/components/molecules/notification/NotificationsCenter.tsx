import SidebarItem from '@atoms/SidebarItem'
import { useColorMode } from '@chakra-ui/react'
import {
  IMessage,
  PopoverNotificationCenter,
  useMarkNotificationsAs,
} from '@novu/notification-center'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiBell } from 'react-icons/fi'

interface Props {
  isMobile: boolean
}

export default function NotificationsCenter({ isMobile }: Props) {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()

  const onMarkNotificationsAsSuccess = (data: IMessage[]) => {
    if (data[0].cta.data.url) {
      window.location.href = data[0].cta.data.url
    }
  }
  const onMarkNotificationsAsError = (error: Error) => {
    console.error(error)
  }

  // Hook needs to be in a NovuProvider instance to work
  const { markNotificationsAs } = useMarkNotificationsAs({
    onSuccess: onMarkNotificationsAsSuccess,
    onError: onMarkNotificationsAsError,
  })

  const onNotificationClick = async (notification: IMessage) => {
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
      position={isMobile ? 'top' : 'right-start'}
    >
      {({ unseenCount }) => (
        <SidebarItem icon={<FiBell />} alert={!!unseenCount}>
          {t('Notifications.tooltip')}
        </SidebarItem>
      )}
    </PopoverNotificationCenter>
  )
}
