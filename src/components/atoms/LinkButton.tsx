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
    border-bottom: 1px solid black;
  }
`

const LinkButton: React.FC<Props> = ({ to, highlightActive, ...props }) =>
  highlightActive ? (
    <NavLinkStyled to={to} exact activeClassName="active">
      <Button {...props} colorScheme="gray" pointerEvents="auto" />
    </NavLinkStyled>
  ) : (
    <Link to={to}>
      <Button {...props} pointerEvents="auto" />
    </Link>
  )

export default LinkButton
