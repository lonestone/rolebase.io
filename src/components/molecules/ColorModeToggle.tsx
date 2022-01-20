import { Switch, SwitchProps, useColorMode } from '@chakra-ui/react'
import React from 'react'

export default function ColorModeToggle(props: SwitchProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Switch
      isChecked={colorMode === 'light'}
      onChange={toggleColorMode}
      {...props}
    />
  )
}
