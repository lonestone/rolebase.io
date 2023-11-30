import {
  Switch as ChakraSwitch,
  SwitchProps,
  forwardRef,
} from '@chakra-ui/react'
import React from 'react'

export default forwardRef<SwitchProps, 'input'>(function Switch(props, ref) {
  return (
    <ChakraSwitch
      ref={ref}
      display="flex"
      alignItems="start"
      lineHeight="normal"
      {...props}
    />
  )
})
