import { ButtonProps, forwardRef, IconButton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SidebarIcon from './SidebarIcon'

export interface SidebarIconButtonProps extends ButtonProps {
  to: string
  exact?: boolean
  icon: ReactElement
  alert?: boolean
  children: string
}

export default forwardRef(function SidebarIconButton(
  { to, exact, icon, alert, children, ...buttonProps }: SidebarIconButtonProps,
  ref
) {
  const location = useLocation()

  const toPathname = to.match(/^[^?]*/)![0]
  const isActive = exact
    ? location.pathname === toPathname
    : location.pathname.startsWith(toPathname)

  return (
    <Link to={to} tabIndex={-1}>
      <IconButton
        ref={ref}
        aria-label={children}
        icon={<SidebarIcon icon={icon} alert={alert} />}
        variant="unstyled"
        display="flex"
        align="center"
        color="gray.400"
        isActive={isActive}
        _hover={{
          color: 'brand',
          opacity: 0.7,
        }}
        _active={{
          color: 'brand',
          opacity: 1,
        }}
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
    </Link>
  )
})
