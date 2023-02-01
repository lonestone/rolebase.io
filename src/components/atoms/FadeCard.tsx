import { Card, CardProps } from '@chakra-ui/react'
import React from 'react'

export default function FadeCard({
  colorScheme,
  children,
  ...rest
}: CardProps) {
  return (
    <Card
      variant="outline"
      bg={`linear-gradient(180deg, var(--chakra-colors-${colorScheme}-100), transparent)`}
      borderRadius="5px"
      borderTop="4px solid"
      borderTopColor={`var(--chakra-colors-${colorScheme}-500)`}
      borderColor={`var(--chakra-colors-${colorScheme}-100)`}
      _dark={{
        bg: `linear-gradient(180deg, var(--chakra-colors-${colorScheme}-700), transparent)`,
        borderTopColor: `var(--chakra-colors-${colorScheme}-500)`,
        borderColor: `var(--chakra-colors-${colorScheme}-700)`,
      }}
      {...rest}
    >
      {children}
    </Card>
  )
}
