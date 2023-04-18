import { Button, ButtonProps, forwardRef } from '@chakra-ui/react'
import { ReactElement } from 'react'
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
      fontWeight={700}
      display="flex"
      justifyContent="start"
      textAlign="left"
      borderRadius="none"
      color="gray.400"
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
    >
      <SidebarIcon icon={icon} alert={alert} ml={5} mr={3} />
      {children}
    </Button>
  )
})
