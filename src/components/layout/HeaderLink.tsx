import { Button, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props {
  to: string
}

const HeaderLink: React.FC<Props> = ({ to, children }) => (
  <WrapItem>
    <ReachLink to={to}>
      <Button colorScheme="gray">{children}</Button>
    </ReachLink>
  </WrapItem>
)

export default HeaderLink
