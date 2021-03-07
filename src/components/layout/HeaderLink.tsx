import { Button, StackItem } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
  to: string
}

const Link = styled(NavLink)`
  &.active button {
    border: 1px solid #bbb;
  }
`

const HeaderLink: React.FC<Props> = ({ to, children }) => (
  <StackItem pointerEvents="auto">
    <Link to={to} exact activeClassName="active">
      <Button colorScheme="gray">{children}</Button>
    </Link>
  </StackItem>
)

export default HeaderLink
