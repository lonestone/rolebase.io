import { Button, ButtonProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

interface Props extends ButtonProps {
  to: string
  highlightActive?: boolean
}

const NavLinkStyled = styled(NavLink)`
  &.active button {
    background-color: #053d00;
  }
`

const LinkButton: React.FC<Props> = ({ to, highlightActive, ...props }) =>
  highlightActive ? (
    <NavLinkStyled to={to} exact activeClassName="active">
      <Button {...props} colorScheme="green" pointerEvents="auto" />
    </NavLinkStyled>
  ) : (
    <Link to={to}>
      <Button {...props} pointerEvents="auto" />
    </Link>
  )

export default LinkButton
