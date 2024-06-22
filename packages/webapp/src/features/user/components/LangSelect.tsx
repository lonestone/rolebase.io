import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  StyleProps,
  Text,
} from '@chakra-ui/react'
import { useChangeLocaleMutation } from '@gql'
import { useUserId } from '@nhost/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { langs, locales } from 'src/i18n'
import { ChevronDownIcon } from 'src/icons'
import { nhost } from 'src/nhost'

export default function LangSelect(styleProps: StyleProps) {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation()
  const userId = useUserId()
  const currentLocale = locales[language as keyof typeof locales] || {
    emoji: '❓',
    name: 'Language',
  }

  // Mutations
  const [changeLocale] = useChangeLocaleMutation()

  const handleClick = async (locale: string) => {
    if (!userId) return
    // Change i18n locale
    changeLanguage(locale)
    // Change user locale in DB
    await changeLocale({ variables: { userId, locale } })
    // Refresh user data
    await nhost.auth.refreshSession()
  }

  return (
    <Box {...styleProps}>
      <Menu placement="top-end">
        <MenuButton
          as={Button}
          size="sm"
          fontSize="md"
          variant="ghost"
          fontWeight="normal"
          leftIcon={<Text fontSize="1.2em">{currentLocale.emoji}</Text>}
          rightIcon={<ChevronDownIcon size="14" />}
        >
          {currentLocale.name}
        </MenuButton>
        <MenuList>
          {langs.map((locale) => {
            const { name, emoji } = locales[locale]
            return (
              <MenuItem
                key={locale}
                icon={<Text fontSize="1.2em">{emoji}</Text>}
                onClick={() => handleClick(locale)}
              >
                {name}
              </MenuItem>
            )
          })}
        </MenuList>
      </Menu>
    </Box>
  )
}
