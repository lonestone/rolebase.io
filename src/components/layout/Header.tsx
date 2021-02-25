import { Flex, Link, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

const HeaderLink: React.FC<{ to: string }> = ({ to, children }) => (
  <WrapItem>
    <Link to={to} as={ReachLink} colorScheme="blue" onClick={() => {}}>
      {children}
    </Link>
  </WrapItem>
)

const Header: React.FC = () => (
  <Flex
    width="100%"
    height="46px"
    background="#e8f4ff"
    alignItems="center"
    paddingLeft="20px"
  >
    <Wrap spacing="20px">
      <HeaderLink to="/">Cercles</HeaderLink>
      <HeaderLink to="/members">Membres</HeaderLink>
      <HeaderLink to="/roles">Rôles</HeaderLink>
    </Wrap>
  </Flex>
)

export default Header
