import { Button, ButtonProps, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props extends ButtonProps {
  to: string
  exact?: boolean
}

export default function HeaderButton({ to, exact, ...buttonProps }: Props) {
  const { colorMode } = useColorMode()
  const location = useLocation()

  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to)

  return (
    <Link to={to} tabIndex={-1}>
      <Button
        size="sm"
        isActive={isActive}
        bg="transparent"
        color={colorMode === 'light' ? 'gray.500' : 'gray.500'}
        _active={{
          color: colorMode === 'light' ? 'black' : 'white',
        }}
        _hover={{
          color: colorMode === 'light' ? 'gray.550' : 'gray.400',
          bg: 'transparent',
        }}
        {...buttonProps}
      />
    </Link>
  )
}
