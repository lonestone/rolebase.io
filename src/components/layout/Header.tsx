import { Button, Flex, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

const HeaderLink: React.FC<{ to: string }> = ({ to, children }) => (
  <WrapItem>
    <ReachLink to={to}>
      <Button colorScheme="gray">{children}</Button>
    </ReachLink>
  </WrapItem>
)

const Header: React.FC = () => (
  <Flex
    position="absolute"
    zIndex="1"
    top="0"
    left="0"
    width="100%"
    alignItems="center"
    padding={2}
  >
    <Wrap spacing={2}>
      <HeaderLink to="/">Cercles</HeaderLink>
      <HeaderLink to="/members">Membres</HeaderLink>
      <HeaderLink to="/roles">Rôles</HeaderLink>
    </Wrap>
  </Flex>
)

export default Header
