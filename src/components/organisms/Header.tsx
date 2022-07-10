import {
  Flex,
  IconButton,
  Spacer,
  Tooltip,
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
import { useTranslation } from 'react-i18next'
import { FaQuestion } from 'react-icons/fa'
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckSquare,
  FiDisc,
  FiMessageSquare,
} from 'react-icons/fi'

export const headerHeight = 50

// Force reset with fast refresh
// @refresh reset

export default function Header() {
  const { t } = useTranslation()
  const user = useStoreState((state) => state.auth.user)
  const org = useCurrentOrg()
  const currentMember = useCurrentMember()

  // Links
  const links: HeaderLink[] = useMemo(
    () =>
      org
        ? [
            {
              to: `/orgs/${org.id}`,
              exact: true,
              icon: <FiDisc />,
              label: t('organisms.Header.circles'),
            },
            {
              to: `/orgs/${org.id}/threads`,
              icon: <FiMessageSquare />,
              label: t('organisms.Header.threads'),
            },
            {
              to: `/orgs/${org.id}/meetings`,
              icon: <FiCalendar />,
              label: t('organisms.Header.meetings'),
              alert: !!currentMember?.meetingId,
            },
            {
              to: `/orgs/${org.id}/tasks?member=${currentMember?.id}`,
              icon: <FiCheckSquare />,
              label: t('organisms.Header.tasks'),
            },
          ]
        : [],
    [org, currentMember, t]
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
      pt="1px"
      borderBottom="1px solid"
      bg="gray.50"
      borderBottomColor={'gray.200'}
      _dark={{
        bg: 'gray.700',
        borderBottomColor: 'gray.550',
      }}
    >
      {org ? (
        <>
          <HeaderOrgMenu mr={2} />

          {!isSmallScreen &&
            links.map((link, i) => (
              <HeaderButton
                key={i}
                to={link.to}
                exact={link.exact}
                icon={link.icon}
                alert={link.alert}
              >
                {link.label}
              </HeaderButton>
            ))}

          <HeaderLinksMenu links={isSmallScreen ? links : undefined} />
        </>
      ) : window.location.pathname !== '/' ? (
        <HeaderButton to="/" exact icon={<FiArrowLeft />}>
          {t('organisms.Header.orgs')}
        </HeaderButton>
      ) : null}

      <Spacer />

      {org && <HeaderSearch />}

      <Tooltip label={t('organisms.Header.help')} hasArrow>
        <IconButton
          aria-label={t('organisms.Header.help')}
          icon={<FaQuestion />}
          variant="ghost"
          size="sm"
          onClick={handleOpenHelp}
        />
      </Tooltip>

      <HeaderUserMenu ml={2} />
    </Flex>
  )
}
