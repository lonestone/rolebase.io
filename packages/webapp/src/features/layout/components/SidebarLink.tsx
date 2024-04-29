import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SidebarContext } from '../contexts/SidebarContext'

export interface SidebarLinkProps {
  to: string
  exact?: boolean
  children: (isExact: boolean, isStart: boolean) => React.ReactNode
}

export default function SidebarLink({ to, children }: SidebarLinkProps) {
  const location = useLocation()
  const sidebarContext = useContext(SidebarContext)

  const toPathname = to.match(/^[^?]*/)![0]
  const isExact = location.pathname === toPathname
  const isStart = location.pathname.startsWith(toPathname)

  return (
    <Link to={to} tabIndex={-1} onClick={sidebarContext?.expand.onClose}>
      {children(isExact, isStart)}
    </Link>
  )
}
