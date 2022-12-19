import { getMagicbellConfig } from '@api/functions'
import { useColorMode, useTheme } from '@chakra-ui/react'
import IconTextButton from '@components/atoms/IconTextButton'
import { useAsyncMemo } from '@hooks/useAsyncMemo'
import MagicBell, {
  FloatingNotificationInbox,
} from '@magicbell/magicbell-react'
import { MagicBellProps } from '@magicbell/magicbell-react/dist/components/MagicBell'
import { useUserId } from '@nhost/react'
import { MagicbellConfig } from '@shared/model/notification'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaBell } from 'react-icons/fa'
import { UserLocalStorageKeys } from 'src/utils/localStorage'

async function getConfig(): Promise<MagicbellConfig | undefined> {
  // Use config from localStorage
  const localConfig = localStorage.getItem(UserLocalStorageKeys.MagicBellConfig)
  if (localConfig) {
    const config = JSON.parse(localConfig)
    if (config && config.expiration > new Date().getTime()) {
      return config
    }
  }

  // Quick fix: wait for Nhost Auth to be ready
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Query function to get Algolia config
  const config = await getMagicbellConfig({})
  localStorage.setItem(
    UserLocalStorageKeys.MagicBellConfig,
    JSON.stringify(config)
  )
  return config
}

export default function Notifications() {
  const userId = useUserId()
  const { t } = useTranslation()
  const theme = useTheme()
  const { colorMode } = useColorMode()
  const { colors, fonts, fontSizes, sizes } = theme

  const config = useAsyncMemo(getConfig, [], undefined)

  if (!userId || !config) return null

  const bg = colorMode === 'light' ? colors.white : colors.gray[800]
  const headerBg = colorMode === 'light' ? colors.gray[50] : colors.gray[700]
  const textColor = colorMode === 'light' ? colors.black : colors.white
  const borderColor =
    colorMode === 'light' ? colors.gray[200] : colors.gray[550]
  const unreadColor = colorMode === 'light' ? colors.red[400] : colors.red[600]

  const magicbellTheme: MagicBellProps['theme'] = {
    icon: {
      borderColor: colors.gray[800],
      width: sizes[8],
    },
    unseenBadge: {
      backgroundColor: unreadColor,
    },
    header: {
      fontFamily: fonts.heading,
      fontSize: fontSizes.md,
      backgroundColor: headerBg,
      textColor,
      borderRadius: '16px',
      borderColor,
    },
    footer: {
      fontFamily: fonts.heading,
      fontSize: fontSizes.sm,
      backgroundColor: headerBg,
      textColor,
      borderRadius: '16px',
      borderColor,
    },
    banner: {
      fontFamily: fonts.body,
      fontSize: fontSizes.md,
      backgroundColor:
        colorMode === 'light' ? colors.blue[100] : colors.blue[800],
      textColor,
      backgroundOpacity: 1,
    },
    container: {
      fontFamily: fonts.body,
      fontSize: fontSizes.md,
      backgroundColor: bg,
      textColor,
      borderColor,
    },
    notification: {
      default: {
        fontFamily: fonts.body,
        fontSize: fontSizes.md,
        textColor,
        backgroundColor: bg,
        hover: {
          backgroundColor:
            colorMode === 'light' ? colors.gray[50] : colors.gray[700],
        },
        state: {
          color: colorMode === 'light' ? colors.gray[100] : colors.gray[600],
        },
        borderRadius: '0px',
        margin: '0px',
      },
      unseen: {
        backgroundColor:
          colorMode === 'light' ? colors.gray[100] : colors.gray[600],
        state: { color: unreadColor },
      },
      unread: {
        state: { color: unreadColor },
      },
    },
  }

  return (
    <MagicBell
      apiKey={config.apiKey}
      userExternalId={userId}
      userKey={config.userKey}
      theme={magicbellTheme}
      locale="en"
      BellIcon={
        <div>
          <IconTextButton
            aria-label={t('Notifications.tooltip')}
            size="sm"
            icon={<FaBell />}
          />
        </div>
      }
      images={{
        // Transparent gif
        emptyInboxUrl:
          'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      }}
    >
      {(props) => (
        <FloatingNotificationInbox
          height={500}
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 16],
                },
              },
            ],
          }}
          {...props}
        />
      )}
    </MagicBell>
  )
}
