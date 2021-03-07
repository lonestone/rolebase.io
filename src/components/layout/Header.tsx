import { ArrowLeftIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Spacer,
  StackItem,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useStoreState } from '../store/hooks'
import HeaderLink from './HeaderLink'

export default function Header() {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const getById = useStoreState((state) => state.orgs.getById)
  const org = useMemo(() => orgId && getById(orgId), [getById, orgId])

  return (
    <Flex
      position="absolute"
      zIndex="1"
      top="0"
      left="0"
      width="100%"
      alignItems="center"
      padding={2}
      pointerEvents="none"
    >
      <HStack spacing={2} w="100%">
        {org && (
          <>
            <HeaderLink to="/">
              <ArrowLeftIcon />
            </HeaderLink>
            <StackItem>
              <Heading size="md" marginLeft={5} marginRight={5}>
                {org.name}
              </Heading>
            </StackItem>
            <HeaderLink to={`/orgs/${orgId}`}>Cercles</HeaderLink>
            <HeaderLink to={`/orgs/${orgId}/members`}>Membres</HeaderLink>
            <HeaderLink to={`/orgs/${orgId}/roles`}>Rôles</HeaderLink>
          </>
        )}
        <Spacer />
        <StackItem pointerEvents="auto">
          <Avatar name={'Godefroy de Compreignac'} src={undefined} size="md" />
        </StackItem>
      </HStack>
    </Flex>
  )
}
