import React from 'react'
import {
  PopoverNotificationCenter,
  IMessage,
  useMarkNotificationsAs,
} from '@novu/notification-center'
import { useColorMode } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaBell } from 'react-icons/fa'
import IconTextButton from '@atoms/IconTextButton'
import SidebarIcon from '@atoms/SidebarIcon'

export default function NotificationsCenter() {
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
      position={'right-start'}
    >
      {({ unseenCount }) => (
        <IconTextButton
          aria-label={t('Notifications.tooltip')}
          icon={<SidebarIcon icon={<FaBell />} alert={!!unseenCount} />}
        />
      )}
    </PopoverNotificationCenter>
  )
}
