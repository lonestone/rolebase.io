import { SidebarContext } from '@contexts/SidebarContext'
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SidebarItem, { SidebarItemProps } from './SidebarItem'

interface Props extends SidebarItemProps {
  to: string
  exact?: boolean
}

export default function SidebarLinkButton({
  to,
  exact,
  ...buttonProps
}: Props) {
  const location = useLocation()
  const sidebarContext = useContext(SidebarContext)

  const toPathname = to.match(/^[^?]*/)![0]
  const isActive = exact
    ? location.pathname === toPathname
    : location.pathname.startsWith(toPathname)

  return (
    <Link to={to} tabIndex={-1}>
      <SidebarItem
        isActive={isActive}
        onClick={sidebarContext?.expand.onClose}
        {...buttonProps}
      />
    </Link>
  )
}
