import { forwardRef } from '@chakra-ui/react'
import React from 'react'
import SidebarItem, { SidebarItemProps } from './SidebarItem'
import SidebarLink, { SidebarLinkProps } from './SidebarLink'

export default forwardRef(function SidebarItemLink(
  { to, ...buttonProps }: Omit<SidebarLinkProps, 'children'> & SidebarItemProps,
  ref
) {
  return (
    <SidebarLink to={to}>
      {(isExact, isStart) => (
        <SidebarItem
          ref={ref}
          isPathExact={isExact}
          isPathStart={isStart}
          {...buttonProps}
        />
      )}
    </SidebarLink>
  )
})
