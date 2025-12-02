import { useAuth } from '../hooks/useAuth'
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
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getLocale, langs, locales } from 'src/i18n'
import { ChevronDownIcon } from 'src/icons'
import { nhost } from 'src/nhost'

export default function LangSelect(styleProps: StyleProps) {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation()
  const { user } = useAuth()
  const currentLocale = getLocale(language)

  // Mutations
  const [changeLocale] = useChangeLocaleMutation()

  const handleClick = async (locale: string) => {
    // Change i18n locale
    changeLanguage(locale)

    if (user) {
      // Change user locale in DB
      await changeLocale({ variables: { userId: user.id, locale } })
      // Refresh user data
      await nhost.refreshSession(0)
    }
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
