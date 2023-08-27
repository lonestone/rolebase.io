import { ButtonProps, forwardRef, IconButton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import SidebarIcon from './SidebarIcon'

export interface SidebarTopIconProps extends ButtonProps {
  isActive?: boolean
  icon: ReactElement
  alert?: boolean
  children: string
}

export default forwardRef(function SidebarTopIcon(
  { isActive, icon, alert, children, ...buttonProps }: SidebarTopIconProps,
  ref
) {
  return (
    <IconButton
      ref={ref}
      aria-label={children}
      icon={<SidebarIcon icon={icon} alert={alert} />}
      variant="unstyled"
      display="flex"
      align="center"
      isActive={isActive}
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
