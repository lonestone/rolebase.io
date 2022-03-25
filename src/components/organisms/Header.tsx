import { Flex, Spacer, useColorMode } from '@chakra-ui/react'
import HeaderButton from '@components/atoms/HeaderButton'
import HeaderLinksMenu from '@components/molecules/HeaderLinksMenu'
import HeaderOrgMenu from '@components/molecules/HeaderOrgMenu'
import HeaderUserMenu from '@components/molecules/HeaderUserMenu'
import HeaderSearchCombobox from '@components/molecules/search/HeaderSearchCombobox'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useStoreState } from '@store/hooks'
import React from 'react'
import {
  FiCalendar,
  FiCheckSquare,
  FiDisc,
  FiMessageSquare,
} from 'react-icons/fi'

export const headerHeight = 48

export default function Header() {
  const user = useStoreState((state) => state.auth.user)
  const org = useCurrentOrg()
  const currentMember = useCurrentMember()
  const { colorMode } = useColorMode()

  if (!user) return null
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      zIndex={1000}
      w="100%"
      h={`${headerHeight}px`}
      alignItems="center"
      px={1}
      bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      borderBottom="1px solid"
      borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.550'}
    >
      {org && (
        <>
          <HeaderOrgMenu />

          <HeaderButton exact to={`/orgs/${org.id}`} leftIcon={<FiDisc />}>
            Cercles
          </HeaderButton>

          <HeaderButton
            to={`/orgs/${org.id}/threads`}
            leftIcon={<FiMessageSquare />}
          >
            Discussions
          </HeaderButton>

          <HeaderButton
            to={`/orgs/${org.id}/meetings${
              currentMember?.meetingId ? '/' + currentMember.meetingId : ''
            }`}
            bg={
              currentMember?.meetingId
                ? colorMode === 'light'
                  ? 'blue.100'
                  : 'blue.900'
                : undefined
            }
            leftIcon={<FiCalendar />}
          >
            Réunions
          </HeaderButton>

          <HeaderButton
            to={`/orgs/${org.id}/tasks`}
            leftIcon={<FiCheckSquare />}
          >
            Tâches
          </HeaderButton>

          <HeaderLinksMenu />
        </>
      )}
      <Spacer />

      {org && <HeaderSearchCombobox />}

      <HeaderUserMenu ml={2} />
    </Flex>
  )
}
