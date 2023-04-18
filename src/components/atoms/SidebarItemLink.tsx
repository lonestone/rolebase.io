import { forwardRef } from '@chakra-ui/react'
import SidebarItem, { SidebarItemProps } from './SidebarItem'
import SidebarLink, { SidebarLinkProps } from './SidebarLink'

export default forwardRef(function SidebarItemLink(
  {
    to,
    exact,
    ...buttonProps
  }: Omit<SidebarLinkProps, 'children'> & SidebarItemProps,
  ref
) {
  return (
    <SidebarLink to={to} exact={exact}>
      {(isActive) => (
        <SidebarItem ref={ref} isActive={isActive} {...buttonProps} />
      )}
    </SidebarLink>
  )
})
