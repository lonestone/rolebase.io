import { Button, ButtonProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props extends ButtonProps {
  to: string
  exact?: boolean
}

const NavLinkStyled = styled(NavLink)`
  &.active button {
    background: white;
  }
`

export default function HeaderButton({ to, exact, ...buttonProps }: Props) {
  return (
    <NavLinkStyled to={to} exact={exact} activeClassName="active" tabIndex={-1}>
      <Button size="sm" bg="transparent" {...buttonProps} />
    </NavLinkStyled>
  )
}
