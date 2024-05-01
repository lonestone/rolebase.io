import {
  Button,
  ButtonProps,
  HTMLChakraProps,
  forwardRef,
} from '@chakra-ui/react'
import { Icon } from 'iconsax-react'
import React from 'react'
import SidebarIcon from './SidebarIcon'

export interface SidebarItemProps extends ButtonProps {
  icon: Icon
  isPathExact?: boolean
  isPathStart?: boolean
  alert?: boolean
}

export default forwardRef(function SidebarItem(
  {
    icon,
    isPathExact,
    isPathStart,
    alert,
    children,
    ...buttonProps
  }: SidebarItemProps,
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
      isActive={isPathExact}
      {...buttonProps}
    >
      <SidebarIcon
        icon={icon}
        isActive={isPathStart}
        alert={alert}
        ml={4}
        mr={3}
      />
      {children}
    </Button>
  )
})

export const sidebarSubItemProps: HTMLChakraProps<any> = {
  pl: '50.25px',
  borderRadius: 'md',

  _hover: { bg: 'whiteAlpha.600' },
  _dark: {
    color: 'whiteAlpha.800',
    _hover: {
      bg: 'whiteAlpha.50',
    },
  },
  sx: {
    '&.active': {
      bg: 'white',
      _dark: {
        color: 'white',
        bg: 'whiteAlpha.100',
      },
    },
  },
}
