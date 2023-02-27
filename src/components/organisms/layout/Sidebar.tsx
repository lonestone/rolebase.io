import BrandIcon from '@atoms/BrandIcon'
import GlassBox from '@atoms/GlassBox'
import IconTextButton from '@atoms/IconTextButton'
import SidebarIconButton from '@atoms/SidebarIconButton'
import SidebarItem from '@atoms/SidebarItem'
import SidebarLinkItem from '@atoms/SidebarLinkItem'
import {
  Box,
  ButtonGroup,
  Flex,
  Link,
  Menu,
  MenuButton,
  Spacer,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import {
  defaultSidebarHeight,
  defaultSidebarWidth,
  SidebarContext,
} from '@contexts/SidebarContext'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import { usePathInOrg } from '@hooks/usePathInOrg'
import Notifications from '@molecules/notification/Notifications'
import OrgSwitch from '@molecules/OrgSwitch'
import SearchGlobalModal from '@molecules/search/SearchGlobalModal'
import SettingsMenuList from '@molecules/SettingsMenuList'
import UserMenu from '@molecules/UserMenu'
import { useAuthenticated } from '@nhost/react'
import { useStoreState } from '@store/hooks'
import { cmdOrCtrlKey } from '@utils/env'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaQuestion, FaSearch } from 'react-icons/fa'
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckSquare,
  FiDisc,
  FiExternalLink,
  FiMessageSquare,
  FiSettings,
} from 'react-icons/fi'
import settings from 'src/settings'

// Force reset with fast refresh
// @refresh reset

const logoContainerWidth = 65

export default function Sidebar() {
  const { t } = useTranslation()
  const isAuthenticated = useAuthenticated()
  const orgId = useOrgId()
  const orgLoading = useStoreState((state) => state.orgs.loading)
  const currentMember = useCurrentMember()

  // Get Sidebar context
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('SidebarContext not found in Sidebar')
  }

  // Links
  const rootPath = usePathInOrg('')

  // Open help chatbox
  const handleOpenHelp = () => {
    const $crisp = (window as any).$crisp
    if (!$crisp) {
      throw new Error('Crisp not found')
    }
    $crisp.push(['do', 'chat:show'])
    $crisp.push(['do', 'chat:toggle'])
  }

  // Show different layout for small screens
  // Options are then hidden by default
  const [isSmall] = useMediaQuery('(max-width: 730px)')

  // Switch between small/large screen
  useEffect(() => {
    const width = isSmall ? 0 : defaultSidebarWidth
    const height = isSmall ? defaultSidebarHeight : 0
    if (context.width !== width) {
      context.setWidth(width)
    }
    if (context.height !== height) {
      context.setHeight(height)
    }
  }, [isSmall])

  // Search
  const searchModal = useDisclosure()

  // Use Cmd+K or Cmd+P keys to open search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'p' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        searchModal.onOpen()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!isAuthenticated) return null

  return (
    <GlassBox
      position="fixed"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      top={0}
      left={0}
      zIndex={1000}
      w={isSmall ? '100%' : `${context.width}px`}
      h={isSmall && !context.expand.isOpen ? context.height + 1 : '100vh'}
      borderRightWidth={isSmall ? 0 : '1px'}
      borderBottomWidth={isSmall ? '1px' : 0}
    >
      <Flex
        h={`${context.height || logoContainerWidth}px`}
        px={isSmall ? 3 : 5}
        bg="gray.800"
        color="white"
        align="center"
      >
        {isSmall ? (
          <>
            <Link onClick={context.expand.onToggle}>
              <BrandIcon size="sm" />
            </Link>

            {!context.expand.isOpen && orgId && (
              <>
                <Spacer />

                <SidebarIconButton to={rootPath} exact icon={<FiDisc />}>
                  {t('Sidebar.roles')}
                </SidebarIconButton>

                <SidebarIconButton
                  to={`${rootPath}threads`}
                  icon={<FiMessageSquare />}
                >
                  {t('Sidebar.threads')}
                </SidebarIconButton>

                <SidebarIconButton
                  to={`${rootPath}meetings`}
                  icon={<FiCalendar />}
                  alert={!!currentMember?.meetingId}
                >
                  {t('Sidebar.meetings')}
                </SidebarIconButton>

                <SidebarIconButton
                  to={`${rootPath}tasks?member=${currentMember?.id || ''}`}
                  icon={<FiCheckSquare />}
                >
                  {t('Sidebar.tasks')}
                </SidebarIconButton>
              </>
            )}
          </>
        ) : (
          <>
            <BrandIcon size="sm" />
            <Spacer />
            <Link
              href={settings.websiteUrl}
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
            >
              <FiExternalLink opacity={0.5} />
            </Link>
          </>
        )}
      </Flex>

      {(!isSmall || context.expand.isOpen) && (
        <Flex flex={1} flexDirection="column">
          {orgId ? (
            <>
              <OrgSwitch mb={5} />

              <SidebarLinkItem to={rootPath} exact icon={<FiDisc />}>
                {t('Sidebar.roles')}
              </SidebarLinkItem>

              <SidebarLinkItem
                to={`${rootPath}threads`}
                icon={<FiMessageSquare />}
              >
                {t('Sidebar.threads')}
              </SidebarLinkItem>

              <SidebarLinkItem
                to={`${rootPath}meetings`}
                icon={<FiCalendar />}
                alert={!!currentMember?.meetingId}
              >
                {t('Sidebar.meetings')}
              </SidebarLinkItem>

              <SidebarLinkItem
                to={`${rootPath}tasks?member=${currentMember?.id || ''}`}
                icon={<FiCheckSquare />}
              >
                {t('Sidebar.tasks')}
              </SidebarLinkItem>

              <Box>
                <Menu>
                  <MenuButton as={SidebarItem} icon={<FiSettings />}>
                    {t('Sidebar.settings')}
                  </MenuButton>
                  <SettingsMenuList mt={-2} ml={2} />
                </Menu>
              </Box>
            </>
          ) : (
            !orgLoading &&
            window.location.pathname !== '/' && (
              <SidebarLinkItem to="/" exact icon={<FiArrowLeft />}>
                {t('Sidebar.orgs')}
              </SidebarLinkItem>
            )
          )}

          <Spacer />

          <Flex
            alignItems="center"
            justifyContent="space-between"
            p={isSmall ? 10 : 3}
            w={isSmall ? '250px' : '100%'}
            mx="auto"
          >
            <ButtonGroup variant="ghost" size={isSmall ? 'lg' : 'sm'}>
              {orgId && (
                <IconTextButton
                  aria-label={t('Sidebar.search', {
                    keys: `${cmdOrCtrlKey} + P`,
                  })}
                  icon={<FaSearch />}
                  onClick={searchModal.onOpen}
                />
              )}

              <IconTextButton
                aria-label={t('Sidebar.help')}
                icon={<FaQuestion />}
                onClick={handleOpenHelp}
              />

              <Notifications />

              <Box>
                <UserMenu />
              </Box>
            </ButtonGroup>
          </Flex>
        </Flex>
      )}

      {searchModal.isOpen && (
        <SearchGlobalModal
          isOpen
          onClose={() => {
            searchModal.onClose()
            context.expand.onClose()
          }}
        />
      )}
    </GlassBox>
  )
}
