import BrandLogo from '@/common/atoms/BrandLogo'
import useCurrentMember from '@/member/hooks/useCurrentMember'
import useOrgOwner from '@/member/hooks/useOrgOwner'
import OrgSwitch from '@/org/components/OrgSwitch'
import { useOrgId } from '@/org/hooks/useOrgId'
import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import SearchGlobalModal from '@/search/components/SearchGlobalModal'
import {
  Box,
  Flex,
  Spacer,
  Tooltip,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import { useAuthenticated } from '@nhost/react'
import { useStoreState } from '@store/hooks'
import { cmdOrCtrlKey } from '@utils/env'
import { Crisp } from 'crisp-sdk-web'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReachLink } from 'react-router-dom'
import {
  BackIcon,
  HelpIcon,
  MeetingsIcon,
  MembersIcon,
  MenuIcon,
  NewsIcon,
  OrgChartIcon,
  SearchIcon,
  SubscriptionIcon,
  TasksIcon,
  ThreadsIcon,
} from 'src/icons'
import BrandIcon from 'src/images/icon.svg'
import userflow from 'userflow.js'
import {
  SidebarContext,
  defaultSidebarHeight,
  defaultSidebarWidth,
} from '../contexts/SidebarContext'
import SidebarItem from './SidebarItem'
import SidebarItemLink from './SidebarItemLink'
import SidebarTopIcon from './SidebarTopIcon'
import SidebarTopIconLink from './SidebarTopIconLink'
import UserMenu from './UserMenu'

// Force reset with fast refresh
// @refresh reset

const logoContainerHeight = 65

export default function Sidebar() {
  const { t } = useTranslation()
  const isAuthenticated = useAuthenticated()
  const orgId = useOrgId()
  const orgLoading = useStoreState((state) => state.orgs.loading)
  const currentMember = useCurrentMember()
  const isOwner = useOrgOwner()
  const currentMeetingId = useStoreState(
    (state) => state.memberStatus.currentMeetingId
  )

  // Get Sidebar context
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('SidebarContext not found in Sidebar')
  }

  // Links
  const rootPath = usePathInOrg('')

  // Open/close Userflow and Crisp
  const handleHelp = () => {
    if (userflow.getResourceCenterState()?.isOpen) {
      // Close Userflow if open
      userflow.closeResourceCenter()
    } else if (Crisp.chat.isVisible()) {
      // Hide Crisp if open
      Crisp.chat.hide()
    } else {
      // Open Userflow
      userflow.openResourceCenter()
    }
  }

  // Show different layout for small screens
  // Options are then hidden by default
  const [isMobile] = useMediaQuery('(max-width: 768px)')

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
    <Box
      position="fixed"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      top={0}
      left={0}
      zIndex={1000}
      w={isMobile ? '100%' : `${context.width}px`}
      h={isMobile && !context.expand.isOpen ? context.height + 1 : '100vh'}
      bg="menulight"
      _dark={{ bg: 'menudark' }}
      sx={{
        '@media print': {
          display: 'none',
        },
      }}
    >
      <Flex
        h={`${context.height || logoContainerHeight}px`}
        px={isMobile ? 3 : 5}
        align="center"
      >
        {isMobile ? (
          /* Mobile: top bar with logo and icons */
          <>
            <BrandIcon width={26} height={26} />
            <Spacer />

            {!context.expand.isOpen && orgId && (
              <>
                <SidebarTopIconLink
                  className="userflow-sidebar-dashboard"
                  to={rootPath}
                  exact
                  icon={NewsIcon}
                >
                  {t('Sidebar.dashboard')}
                </SidebarTopIconLink>

                <SidebarTopIconLink
                  className="userflow-sidebar-roles"
                  to={`${rootPath}roles`}
                  exact
                  icon={OrgChartIcon}
                >
                  {t('Sidebar.roles')}
                </SidebarTopIconLink>

                <SidebarTopIconLink
                  className="userflow-sidebar-threads"
                  to={`${rootPath}threads?member=${currentMember?.id || ''}`}
                  icon={ThreadsIcon}
                >
                  {t('Sidebar.threads')}
                </SidebarTopIconLink>

                <SidebarTopIconLink
                  className="userflow-sidebar-meetings"
                  to={`${rootPath}meetings?member=${currentMember?.id || ''}`}
                  icon={MeetingsIcon}
                  alert={!!currentMeetingId}
                >
                  {t('Sidebar.meetings')}
                </SidebarTopIconLink>

                <SidebarTopIconLink
                  className="userflow-sidebar-tasks"
                  to={`${rootPath}tasks?member=${currentMember?.id || ''}`}
                  icon={TasksIcon}
                >
                  {t('Sidebar.tasks')}
                </SidebarTopIconLink>
              </>
            )}

            <SidebarTopIcon
              icon={MenuIcon}
              isActive={context.expand.isOpen}
              onClick={context.expand.onToggle}
            >
              {t('Sidebar.menu')}
            </SidebarTopIcon>
          </>
        ) : (
          <Box ml={3}>
            <ReachLink to="/" tabIndex={-1}>
              <BrandLogo size="sm" />
            </ReachLink>
          </Box>
        )}
      </Flex>

      {(!isMobile || context.expand.isOpen) && (
        /* Desktop: Sidebar content */
        <Flex
          flex={1}
          px={5}
          pt={isMobile ? 5 : 0}
          align="stretch"
          flexDirection="column"
          alignItems="stretch"
          overflowY="auto"
          // No X scrollbar, required because UserMenu uses a invisible placeholder that can go beyond the frame
          overflowX="clip"
        >
          {orgId ? (
            <>
              <OrgSwitch mt={3} mb={7} />

              <SidebarItemLink
                className="userflow-sidebar-dashboard"
                to={rootPath}
                exact
                icon={NewsIcon}
              >
                {t('Sidebar.dashboard')}
              </SidebarItemLink>

              <SidebarItemLink
                className="userflow-sidebar-roles"
                to={`${rootPath}roles`}
                exact
                icon={OrgChartIcon}
              >
                {t('Sidebar.roles')}
              </SidebarItemLink>

              <SidebarItemLink
                className="userflow-sidebar-threads"
                to={`${rootPath}threads?member=${currentMember?.id || ''}`}
                icon={ThreadsIcon}
              >
                {t('Sidebar.threads')}
              </SidebarItemLink>

              <SidebarItemLink
                className="userflow-sidebar-meetings"
                to={`${rootPath}meetings?member=${currentMember?.id || ''}`}
                icon={MeetingsIcon}
                alert={!!currentMeetingId}
              >
                {t('Sidebar.meetings')}
              </SidebarItemLink>

              <SidebarItemLink
                className="userflow-sidebar-tasks"
                to={`${rootPath}tasks?member=${currentMember?.id || ''}`}
                icon={TasksIcon}
              >
                {t('Sidebar.tasks')}
              </SidebarItemLink>
            </>
          ) : (
            !orgLoading &&
            window.location.pathname !== '/' && (
              <SidebarItemLink to="/" exact icon={BackIcon}>
                {t('Sidebar.orgs')}
              </SidebarItemLink>
            )
          )}

          <Spacer />

          {orgId && (
            <>
              <Tooltip
                label={isMobile ? '' : `${cmdOrCtrlKey} + P`}
                placement="right"
                hasArrow
              >
                <SidebarItem
                  className="userflow-sidebar-search"
                  icon={SearchIcon}
                  onClick={searchModal.onOpen}
                >
                  {t('Sidebar.search')}
                </SidebarItem>
              </Tooltip>

              <SidebarItemLink
                className="userflow-sidebar-members"
                to={`${rootPath}members`}
                icon={MembersIcon}
              >
                {t('Sidebar.members')}
              </SidebarItemLink>

              {isOwner && (
                <SidebarItemLink
                  className="userflow-sidebar-subscription"
                  to={`${rootPath}subscription`}
                  icon={SubscriptionIcon}
                >
                  {t('Sidebar.subscription')}
                </SidebarItemLink>
              )}
            </>
          )}

          <SidebarItem
            className="userflow-sidebar-help"
            icon={HelpIcon}
            onClick={handleHelp}
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
    </Box>
  )
}
