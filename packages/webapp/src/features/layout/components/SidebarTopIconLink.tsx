import { forwardRef } from '@chakra-ui/react'
import React from 'react'
import SidebarLink, { SidebarLinkProps } from './SidebarLink'
import SidebarTopIcon, { SidebarTopIconProps } from './SidebarTopIcon'

export default forwardRef(function SidebarTopIconLink(
  {
    to,
    exact,
    ...buttonProps
  }: Omit<SidebarLinkProps, 'children'> & SidebarTopIconProps,
  ref
) {
  return (
    <SidebarLink to={to} exact={exact}>
      {(isExact, isStart) => (
        <SidebarTopIcon
          ref={ref}
          isPathExact={isExact}
          isPathStart={isStart}
          {...buttonProps}
        />
      )}
    </SidebarLink>
  )
})
