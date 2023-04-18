import { Box, BoxProps, Circle } from '@chakra-ui/react'
import { ReactElement } from 'react'

export interface SidebarIconProps extends BoxProps {
  icon: ReactElement
  alert?: boolean
}

export default function SidebarIcon({
  icon,
  alert,
  ...boxProps
}: SidebarIconProps) {
  return (
    <Box fontSize="1.2em" position="relative" {...boxProps}>
      {alert && (
        <Circle
          size="8px"
          position="absolute"
          top="-3px"
          right="-3px"
          bg="red.400"
          _dark={{ bg: 'red.600' }}
        />
      )}
      {icon}
    </Box>
  )
}
