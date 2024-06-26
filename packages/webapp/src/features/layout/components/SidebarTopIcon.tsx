import { ButtonProps, forwardRef, IconButton } from '@chakra-ui/react'
import { Icon } from 'iconsax-react'
import React from 'react'
import SidebarIcon from './SidebarIcon'

export interface SidebarTopIconProps extends ButtonProps {
  icon: Icon
  isPathExact?: boolean
  isPathStart?: boolean
  alert?: boolean
  children: string
}

export default forwardRef(function SidebarTopIcon(
  {
    icon,
    isPathExact,
    isPathStart,
    alert,
    children,
    ...buttonProps
  }: SidebarTopIconProps,
  ref
) {
  return (
    <IconButton
      ref={ref}
      aria-label={children}
      icon={<SidebarIcon icon={icon} isActive={isPathStart} alert={alert} />}
      variant="unstyled"
      display="flex"
      align="center"
      isActive={isPathExact}
      _hover={{ bg: 'whiteAlpha.600' }}
      _active={{ bg: 'white' }}
      _dark={{
        color: 'whiteAlpha.600',
        _hover: {
          color: 'whiteAlpha.800',
        },
        _active: {
          color: 'white',
          bg: 'whiteAlpha.100',
        },
      }}
      {...buttonProps}
    />
  )
})
