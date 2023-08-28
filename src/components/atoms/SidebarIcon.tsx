import { Box, BoxProps, Circle } from '@chakra-ui/react'
import { Icon } from 'iconsax-react'
import React from 'react'

export interface SidebarIconProps extends BoxProps {
  icon: Icon
  isActive?: boolean
  alert?: boolean
}

export default function SidebarIcon({
  icon: IconComponent,
  isActive,
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
      <IconComponent variant={isActive ? 'Bold' : 'Linear'} />
    </Box>
  )
}
