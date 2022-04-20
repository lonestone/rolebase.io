import {
  Flex,
  IconButton,
  Spacer,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react'
import HeaderButton from '@components/atoms/HeaderButton'
import HeaderLinksMenu, {
  HeaderLink,
} from '@components/molecules/HeaderLinksMenu'
import HeaderOrgMenu from '@components/molecules/HeaderOrgMenu'
import HeaderUserMenu from '@components/molecules/HeaderUserMenu'
import HeaderSearch from '@components/molecules/search/HeaderSearch'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { FaQuestion } from 'react-icons/fa'
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

  // Links
  const links: HeaderLink[] = useMemo(
    () =>
      org
        ? [
            {
              to: `/orgs/${org.id}`,
              exact: true,
              icon: <FiDisc />,
              label: 'Cercles',
            },
            {
              to: `/orgs/${org.id}/threads`,
              icon: <FiMessageSquare />,
              label: 'Discussions',
            },
            {
              to: `/orgs/${org.id}/meetings${
                currentMember?.meetingId ? '/' + currentMember.meetingId : ''
              }`,
              icon: <FiCalendar />,
              label: 'Réunions',
              bg: currentMember?.meetingId
                ? colorMode === 'light'
                  ? 'blue.100'
                  : 'blue.900'
                : undefined,
            },
            {
              to: `/orgs/${org.id}/tasks`,
              icon: <FiCheckSquare />,
              label: 'Tâches',
            },
          ]
        : [],
    [org, currentMember, colorMode]
  )

  // Open help chatbox
  const handleOpenHelp = () => {
    const $crisp = (window as any).$crisp
    if (!$crisp) {
      throw new Error('Crisp not found')
    }
    $crisp.push(['do', 'chat:show'])
    $crisp.push(['do', 'chat:toggle'])
  }

  // Hider buttons when screen is too small
  const [isSmallScreen] = useMediaQuery('(max-width: 730px)')

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

          {!isSmallScreen &&
            links.map((link, i) => (
              <HeaderButton
                key={i}
                to={link.to}
                exact={link.exact}
                leftIcon={link.icon}
                bg={link.bg}
              >
                {link.label}
              </HeaderButton>
            ))}

          <HeaderLinksMenu links={isSmallScreen ? links : undefined} />
        </>
      )}
      <Spacer />

      {org && <HeaderSearch />}

      <IconButton
        aria-label="Aide"
        icon={<FaQuestion />}
        variant="ghost"
        size="sm"
        onClick={handleOpenHelp}
      />

      <HeaderUserMenu ml={2} />
    </Flex>
  )
}
