import { getNovuConfig } from '@api/functions'
import { Box, useColorMode, useTheme } from '@chakra-ui/react'
import { useAsyncMemo } from '@hooks/useAsyncMemo'
import NotificationsCenter from '@molecules/notification/NotificationsCenter'
import { useUserId } from '@nhost/react'
import { INovuProviderProps, NovuProvider } from '@novu/notification-center'
import { NovuConfig } from '@shared/model/notification'
import { getPureLanguageCode } from '@utils/getPureLanguageCode'
import { UserLocalStorageKeys } from '@utils/localStorage'
import React from 'react'
import { useTranslation } from 'react-i18next'

async function getConfig(): Promise<NovuConfig | undefined> {
  // Use config from localStorage
  const localConfig = localStorage.getItem(UserLocalStorageKeys.NovuConfig)
  if (localConfig) {
    const config = JSON.parse(localConfig)
    if (config && config.expiration > new Date().getTime()) {
      return config
    }
  }

  // Quick fix: wait for Nhost Auth to be ready
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Query function to get Novu config
  const config = await getNovuConfig({})
  localStorage.setItem(UserLocalStorageKeys.NovuConfig, JSON.stringify(config))
  return config
}

interface Props {
  isMobile: boolean
}

export default function Notifications({ isMobile }: Props) {
  const userId = useUserId()
  const {
    i18n: { language },
  } = useTranslation()
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
  const unseenColor = colorMode === 'light' ? colors.gray[600] : colors.white
  const unseenBadgeBg = colorMode === 'light' ? colors.gray[800] : colors.white
  // Advise by Novu docs to setup style like this
  const novuStyles: INovuProviderProps['styles'] = {
    unseenBadge: {
      root: {
        color: colorMode === 'light' ? colors.white : colors.black,
        background: unseenBadgeBg,
      },
    },
    header: {
      root: {
        backgroundColor: headerBg,
        color: textColor,
        borderRadius: '16px 16px 0 0',
      },
      title: {
        fontFamily: fonts.heading,
        fontSize: fontSizes.md,
      },
      cog: {
        color: textColor,
      },
    },
    footer: {
      root: {
        fontFamily: fonts.heading,
        fontSize: fontSizes.sm,
        backgroundColor: headerBg,
        borderRadius: '0 0 16px 16px',
        height: 'auto',
        padding: '10px',
      },
      title: {
        color: textColor,
      },
    },
    layout: {
      root: {
        fontFamily: fonts.body,
        fontSize: fontSizes.md,
        backgroundColor: bg,
        color: textColor,
        border: `1px solid ${borderColor}`,
        padding: '0',
        borderRadius: '16px',
      },
    },
    notifications: {
      root: {
        fontFamily: fonts.body,
        fontSize: fontSizes.md,
        color: textColor,
        backgroundColor: bg,
      },
      listItem: {
        timestamp: {
          color: textColor,
        },
        read: {
          '&:hover': {
            backgroundColor:
              colorMode === 'light' ? colors.gray[50] : colors.gray[700],
          },
        },
        unread: {
          backgroundColor:
            colorMode === 'light' ? colors.gray[100] : colors.gray[600],
          color: unseenColor,
          '&::before': {
            background: textColor,
          },
          '&:hover': {
            backgroundColor:
              colorMode === 'light' ? colors.gray[50] : colors.gray[700],
          },
        },
      },
    },
    preferences: {
      root: {
        fontFamily: fonts.body,
        fontSize: fontSizes.md,
        color: textColor,
      },
      item: {
        title: {
          fontFamily: fonts.body,
          fontSize: fontSizes.md,
        },
        channels: {
          fontFamily: fonts.body,
          fontSize: fontSizes.md,
        },
        content: {
          icon: {
            color: textColor,
            width: sizes[5],
          },
        },
      },
    },
    accordion: {
      item: {
        fontFamily: fonts.body,
        fontSize: fontSizes.md,
        color: textColor,
      },
      content: {
        fontFamily: fonts.body,
        fontSize: fontSizes.md,
        color: textColor,
      },
    },
    popover: {
      arrow: {
        display: 'none',
      },
    },
  }

  return (
    <Box>
      <NovuProvider
        subscriberId={userId}
        subscriberHash={config.userKey}
        applicationIdentifier={config.appId}
        i18n={getPureLanguageCode(language) as INovuProviderProps['i18n']}
        styles={novuStyles}
      >
        <NotificationsCenter isMobile={isMobile} />
      </NovuProvider>
    </Box>
  )
}
