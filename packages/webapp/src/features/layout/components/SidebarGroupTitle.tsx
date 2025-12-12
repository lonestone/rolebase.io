import { Text, TextProps } from '@chakra-ui/react'
import React from 'react'

interface SidebarGroupTitleProps extends TextProps {
  children: React.ReactNode
}

export default function SidebarGroupTitle({
  children,
  ...props
}: SidebarGroupTitleProps) {
  return (
    <Text
      fontSize="xs"
      fontWeight="semibold"
      color="gray.500"
      px={3}
      py={1}
      textTransform="uppercase"
      _dark={{ color: 'gray.400' }}
      {...props}
    >
      {children}
    </Text>
  )
}
