import { Flex, Wrap } from '@chakra-ui/react'
import React from 'react'
import { useStoreState } from '../store/hooks'
import HeaderLink from './HeaderLink'

export default function Header() {
  const orgId = useStoreState((state) => state.orgs.currentId)

  return (
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
        {orgId && (
          <>
            <HeaderLink to={`/orgs/${orgId}`}>Cercles</HeaderLink>
            <HeaderLink to={`/orgs/${orgId}/members`}>Membres</HeaderLink>
            <HeaderLink to={`/orgs/${orgId}/roles`}>Rôles</HeaderLink>
          </>
        )}
      </Wrap>
    </Flex>
  )
}
