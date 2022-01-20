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
        _active={{
          bg: colorMode === 'light' ? 'white' : 'gray.800',
        }}
        {...buttonProps}
      />
    </Link>
  )
}
