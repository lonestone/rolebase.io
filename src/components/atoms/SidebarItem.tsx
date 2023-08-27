import { Button, ButtonProps, forwardRef } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import SidebarIcon from './SidebarIcon'

export interface SidebarItemProps extends ButtonProps {
  icon: ReactElement
  alert?: boolean
}

export default forwardRef(function SidebarItem(
  { icon, alert, children, ...buttonProps }: SidebarItemProps,
  ref
) {
  return (
    <Button
      ref={ref}
      variant="unstyled"
      w="100%"
      h="auto"
      py={3}
      fontWeight="normal"
      display="flex"
      justifyContent="start"
      textAlign="left"
      borderRadius="xl"
      _hover={{ bg: 'whiteAlpha.600' }}
      _active={{
        fontWeight: 'semibold',
        bg: 'white',
      }}
      _dark={{
        color: 'whiteAlpha.800',
        _hover: {
          bg: 'whiteAlpha.50',
        },
        _active: {
          color: 'white',
          bg: 'whiteAlpha.100',
        },
      }}
      {...buttonProps}
    >
      <SidebarIcon icon={icon} alert={alert} ml={5} mr={3} />
      {children}
    </Button>
  )
})
