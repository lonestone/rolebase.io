import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props extends ButtonProps {
  to: string
  exact?: boolean
}

export default function HeaderButton({ to, exact, bg, ...buttonProps }: Props) {
  const location = useLocation()

  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to)

  return (
    <Link to={to} tabIndex={-1}>
      <Button
        size="sm"
        variant="ghost"
        bg={bg}
        isActive={isActive}
        {...buttonProps}
      />
    </Link>
  )
}
