import { Box, Center, Switch, Tooltip, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DarkThemeIcon, LightThemeIcon } from 'src/icons'

export default function ThemeSwitch() {
  const { t } = useTranslation()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Tooltip label={t('ThemeSwitch.tooltip')} placement="bottom">
      <Box position="relative" w="fit-content">
        <Switch
          size="lg"
          colorScheme="gray"
          isChecked={colorMode === 'light'}
          onChange={toggleColorMode}
        />
        <Center
          color="gray.500"
          position="absolute"
          pointerEvents="none"
          top={0}
          h={6}
          w={6}
          m={0.5}
          _light={{
            right: 0,
          }}
          _dark={{
            left: 0,
          }}
        >
          {colorMode === 'light' ? (
            <LightThemeIcon size={18} variant="Bold" />
          ) : (
            <DarkThemeIcon size={18} variant="Bold" />
          )}
        </Center>
      </Box>
    </Tooltip>
  )
}
