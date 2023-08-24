import BrandIcon from '@atoms/BrandIcon'
import GlassBox from '@atoms/GlassBox'
import SidebarItem from '@atoms/SidebarItem'
import SidebarItemLink from '@atoms/SidebarItemLink'
import SidebarTopIcon from '@atoms/SidebarTopIcon'
import SidebarTopIconLink from '@atoms/SidebarTopIconLink'
import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Tooltip,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import {
  SidebarContext,
  defaultSidebarHeight,
  defaultSidebarWidth,
} from '@contexts/SidebarContext'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import useOrgOwner from '@hooks/useOrgOwner'
import { usePathInOrg } from '@hooks/usePathInOrg'
import useSuperAdmin from '@hooks/useSuperAdmin'
import OrgSwitch from '@molecules/OrgSwitch'
import UserMenu from '@molecules/UserMenu'
import Notifications from '@molecules/notification/Notifications'
import SearchGlobalModal from '@molecules/search/SearchGlobalModal'
import { useAuthenticated } from '@nhost/react'
import { useStoreState } from '@store/hooks'
import { cmdOrCtrlKey } from '@utils/env'
import { Crisp } from 'crisp-sdk-web'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiActivity,
  FiArrowLeft,
  FiCalendar,
  FiCheckSquare,
  FiDisc,
  FiHelpCircle,
  FiMenu,
  FiMessageSquare,
  FiSettings,
  FiStar,
  FiUsers,
} from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'

// Force reset with fast refresh
// @refresh reset

const logoContainerWidth = 65

export default function Sidebar() {
  const { t } = useTranslation()
  const isAuthenticated = useAuthenticated()
  const orgId = useOrgId()
  const orgLoading = useStoreState((state) => state.orgs.loading)
  const currentMember = useCurrentMember()
  const isSuperAdmin = useSuperAdmin()
  const isOwner = useOrgOwner()

  // Get Sidebar context
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('SidebarContext not found in Sidebar')
  }

  // Links
  const rootPath = usePathInOrg('')

  // Open help chatbox
  const handleOpenHelp = () => {
    if (Crisp.chat.isVisible()) {
      Crisp.chat.hide()
    } else {
      Crisp.chat.show()
      Crisp.chat.open()
    }
  }

  // Show different layout for small screens
  // Options are then hidden by default
  const [isMobile] = useMediaQuery('(max-width: 730px)')

  // Switch between small/large screen
  useEffect(() => {
    const width = isMobile ? 0 : defaultSidebarWidth
    const height = isMobile ? defaultSidebarHeight : 0
    if (context.width !== width) {
      context.setWidth(width)
    }
    if (context.height !== height) {
      context.setHeight(height)
    }
  }, [isMobile])

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
      w={isMobile ? '100%' : `${context.width}px`}
      h={isMobile && !context.expand.isOpen ? context.height + 1 : '100vh'}
      borderRightWidth={isMobile ? 0 : '1px'}
      borderBottomWidth={isMobile ? '1px' : 0}
    >
      <Flex
        h={`${context.height || logoContainerWidth}px`}
        px={isMobile ? 3 : 5}
        bg="gray.800"
        color="white"
        align="center"
      >
        <ReachLink to={rootPath} tabIndex={-1}>
          <BrandIcon size="sm" />
        </ReachLink>

        {isMobile && (
          /* Mobile: top bar with logo and icons */
          <>
            <Spacer />

            {!context.expand.isOpen && orgId && (
              <>
                <SidebarTopIconLink
                  className="userflow-sidebar-dashboard"
                  to={rootPath}
                  exact
                  icon={<FiActivity />}
                >
                  {t('Sidebar.dashboard')}
                </SidebarTopIconLink>

                <SidebarTopIconLink
                  className="userflow-sidebar-roles"
                  to={`${rootPath}roles`}
                  exact
                  icon={<FiDisc />}
                >
                  {t('Sidebar.roles')}
                </SidebarTopIconLink>

                <SidebarTopIconLink
                  className="userflow-sidebar-threads"
                  to={`${rootPath}threads`}
                  icon={<FiMessageSquare />}
                >
                  {t('Sidebar.threads')}
                </SidebarTopIconLink>

                <SidebarTopIconLink
                  className="userflow-sidebar-meetings"
                  to={`${rootPath}meetings`}
                  icon={<FiCalendar />}
                  alert={!!currentMember?.meetingId}
                >
                  {t('Sidebar.meetings')}
                </SidebarTopIconLink>

                <SidebarTopIconLink
                  className="userflow-sidebar-tasks"
                  to={`${rootPath}tasks?member=${currentMember?.id || ''}`}
                  icon={<FiCheckSquare />}
                >
                  {t('Sidebar.tasks')}
                </SidebarTopIconLink>
              </>
            )}

            <SidebarTopIcon icon={<FiMenu />} onClick={context.expand.onToggle}>
              {t('Sidebar.menu')}
            </SidebarTopIcon>
          </>
        )}
      </Flex>

      {(!isMobile || context.expand.isOpen) && (
        /* Desktop: Sidebar content */
        <Flex
          flex={1}
          flexDirection="column"
          alignItems="stretch"
          overflowY="auto"
          // No X scrollbar, required because UserMenu uses a invisible placeholder that can go beyond the frame
          overflowX="clip"
        >
          {orgId ? (
            <>
              <OrgSwitch mb={3} />

              <Notifications isMobile={isMobile} />

              <Box
                px={4}
                mt={3}
                mb={5}
                transition="opacity 200ms"
                opacity={searchModal.isOpen ? 0 : 1}
              >
                <Tooltip
                  label={isMobile ? '' : `${cmdOrCtrlKey} + P`}
                  placement="right"
                  hasArrow
                >
                  <InputGroup size="sm">
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon
                        color="gray.400"
                        _dark={{
                          color: 'whiteAlpha.600',
                        }}
                      />
                    </InputLeftElement>
                    <Input
                      value={t('Sidebar.search')}
                      borderRadius="md"
                      isReadOnly
                      color="gray.400"
                      _dark={{
                        color: 'whiteAlpha.600',
                      }}
                      onFocus={function (e) {
                        e.target.blur()
                      }}
                      onClick={searchModal.onOpen}
                    />
                  </InputGroup>
                </Tooltip>
              </Box>

              <SidebarItemLink
                className="userflow-sidebar-dashboard"
                to={rootPath}
                exact
                icon={<FiActivity />}
              >
                {t('Sidebar.dashboard')}
              </SidebarItemLink>

              <SidebarItemLink
                className="userflow-sidebar-roles"
                to={`${rootPath}roles`}
                exact
                icon={<FiDisc />}
              >
                {t('Sidebar.roles')}
              </SidebarItemLink>

              <SidebarItemLink
                className="userflow-sidebar-threads"
                to={`${rootPath}threads`}
                icon={<FiMessageSquare />}
              >
                {t('Sidebar.threads')}
              </SidebarItemLink>

              <SidebarItemLink
                className="userflow-sidebar-meetings"
                to={`${rootPath}meetings`}
                icon={<FiCalendar />}
                alert={!!currentMember?.meetingId}
              >
                {t('Sidebar.meetings')}
              </SidebarItemLink>

              <SidebarItemLink
                className="userflow-sidebar-tasks"
                to={`${rootPath}tasks?member=${currentMember?.id || ''}`}
                icon={<FiCheckSquare />}
              >
                {t('Sidebar.tasks')}
              </SidebarItemLink>
            </>
          ) : (
            !orgLoading &&
            window.location.pathname !== '/' && (
              <SidebarItemLink to="/" exact icon={<FiArrowLeft />}>
                {t('Sidebar.orgs')}
              </SidebarItemLink>
            )
          )}

          <Spacer />

          {orgId && (
            <>
              <SidebarItemLink
                className="userflow-sidebar-members"
                to={`${rootPath}members`}
                icon={<FiUsers />}
              >
                {t('Sidebar.members')}
              </SidebarItemLink>

              {isOwner && (
                <SidebarItemLink
                  className="userflow-sidebar-subscription"
                  to={`${rootPath}subscription`}
                  icon={<FiStar />}
                >
                  {t('Sidebar.subscription')}
                </SidebarItemLink>
              )}

              {isSuperAdmin && (
                <SidebarItemLink to={`admin`} icon={<FiSettings />}>
                  {t('Sidebar.superAdmin')}
                </SidebarItemLink>
              )}
            </>
          )}

          <SidebarItem
            className="userflow-sidebar-help"
            icon={<FiHelpCircle />}
            onClick={handleOpenHelp}
          >
            {t('Sidebar.help')}
          </SidebarItem>

          <UserMenu
            className="userflow-sidebar-member"
            isMobile={isMobile}
            mt={7}
            mb={2}
          />
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
