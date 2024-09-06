import useCurrentMember from '@/member/hooks/useCurrentMember'
import OrgSwitch from '@/org/components/OrgSwitch'
import { useOrgId } from '@/org/hooks/useOrgId'
import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import SearchGlobalModal from '@/search/components/SearchGlobalModal'
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  Spacer,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { useAuthenticated } from '@nhost/react'
import { useStoreState } from '@store/hooks'
import { cmdOrCtrlKey } from '@utils/env'
import { Crisp } from 'crisp-sdk-web'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BackIcon,
  ChevronLeftIcon,
  HelpIcon,
  MeetingsIcon,
  MenuIcon,
  NewsIcon,
  OrgChartIcon,
  SearchIcon,
  SettingsIcon,
  TasksIcon,
  ThreadsIcon,
} from 'src/icons'
import BrandIcon from 'src/images/icon.svg'
import { SidebarContext } from '../contexts/SidebarContext'
import SettingsMenuList from './SettingsMenuList'
import SidebarItem from './SidebarItem'
import SidebarItemLink from './SidebarItemLink'
import SidebarLayout from './SidebarLayout'
import SidebarMeetings from './SidebarMeetings'
import SidebarTasks from './SidebarTasks'
import SidebarThreads from './SidebarThreads'
import SidebarTopIcon from './SidebarTopIcon'
import SidebarTopIconLink from './SidebarTopIconLink'

// Force reset with fast refresh
// @refresh reset

const logoContainerHeight = 65

export default function Sidebar() {
  const { t } = useTranslation()
  const isAuthenticated = useAuthenticated()
  const orgId = useOrgId()
  const orgLoading = useStoreState((state) => state.orgs.loading)
  const currentMember = useCurrentMember()
  const currentMeetingId = useStoreState(
    (state) => state.memberStatus.currentMeetingId
  )

  // Get Sidebar context
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('SidebarContext not found in Sidebar')
  }
  const { isMobile, expand, minimize, height } = context

  // Links
  const rootPath = usePathInOrg('')

  // Open/close Crisp
  const handleHelp = () => {
    if (Crisp.chat.isVisible()) {
      // Hide Crisp
      Crisp.chat.hide()
    } else {
      // Open Crisp
      Crisp.chat.show()
      Crisp.chat.open()
    }
  }

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
    <SidebarLayout>
      <Flex
        h={`${height || logoContainerHeight}px`}
        px={isMobile ? 3 : 5}
        align="center"
      >
        {isMobile ? (
          /* Mobile: top bar with logo and icons */
          <>
            <BrandIcon width={24} height={24} />
            <OrgSwitch flex={1} />

            {!expand.isOpen && orgId && (
              <>
                <SidebarTopIconLink
                  className="userflow-sidebar-news"
                  to={`${rootPath}news`}
                  icon={NewsIcon}
                >
                  {t('Sidebar.news')}
                </SidebarTopIconLink>

                <SidebarTopIconLink
                  className="userflow-sidebar-roles"
                  to={`${rootPath}roles`}
                  icon={OrgChartIcon}
                >
                  {t('Sidebar.roles')}
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
                  className="userflow-sidebar-threads"
                  to={`${rootPath}threads?member=${currentMember?.id || ''}`}
                  icon={ThreadsIcon}
                >
                  {t('Sidebar.threads')}
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
              isActive={expand.isOpen}
              onClick={expand.onToggle}
            >
              {t('Sidebar.menu')}
            </SidebarTopIcon>
          </>
        ) : (
          <Flex w="100%" align="center" ml={3} role="group">
            <BrandIcon width={24} height={24} />
            <OrgSwitch />
            <Spacer />
            {!minimize.isOpen && (
              <Tooltip label={t('Sidebar.close')} placement="right">
                <IconButton
                  aria-label=""
                  variant="ghost"
                  icon={<ChevronLeftIcon size={18} />}
                  onClick={minimize.onToggle}
                />
              </Tooltip>
            )}
          </Flex>
        )}
      </Flex>

      {(!isMobile || expand.isOpen) && (
        /* Desktop: Sidebar content */
        <Box
          flex={1}
          pl={{ base: 0, md: 4 }}
          pr={{ base: 1, md: 2 }}
          pt={{ base: 2, md: 0 }}
          pb={3}
          overflowY={{
            base: 'auto',
            md: 'hidden', // Hide scrollbar on desktop
          }}
          _hover={{
            // Show scrollbar on hover
            overflowY: 'auto',
          }}
        >
          {orgId ? (
            <Tooltip
              label={isMobile ? '' : `${cmdOrCtrlKey} + P`}
              placement="right"
              hasArrow
            >
              <SidebarItem
                className="userflow-sidebar-search"
                icon={SearchIcon}
                py={1}
                onClick={searchModal.onOpen}
              >
                {t('Sidebar.search')}
              </SidebarItem>
            </Tooltip>
          ) : (
            !orgLoading &&
            window.location.pathname !== '/' && (
              <SidebarItemLink to="/" icon={BackIcon}>
                {t('Sidebar.orgs')}
              </SidebarItemLink>
            )
          )}

          <Menu>
            <MenuButton
              as={SidebarItem}
              className="userflow-sidebar-settings"
              icon={SettingsIcon}
              py={1}
            >
              {t('Sidebar.settings')}
            </MenuButton>
            <SettingsMenuList />
          </Menu>

          <SidebarItem
            className="userflow-sidebar-help"
            icon={HelpIcon}
            py={1}
            onClick={handleHelp}
          >
            {t('Sidebar.help')}
          </SidebarItem>

          <Box h={10} />

          {orgId && (
            <>
              <SidebarItemLink
                className="userflow-sidebar-news"
                to={`${rootPath}news`}
                icon={NewsIcon}
              >
                {t('Sidebar.news')}
              </SidebarItemLink>

              <SidebarItemLink
                className="userflow-sidebar-roles"
                to={`${rootPath}roles`}
                icon={OrgChartIcon}
              >
                {t('Sidebar.roles')}
              </SidebarItemLink>

              <SidebarItemLink
                className="userflow-sidebar-meetings"
                to={`${rootPath}meetings?member=${currentMember?.id || ''}`}
                icon={MeetingsIcon}
                alert={!!currentMeetingId}
              >
                {t('Sidebar.meetings')}
              </SidebarItemLink>

              <SidebarMeetings max={3} />

              <SidebarItemLink
                className="userflow-sidebar-threads"
                to={`${rootPath}threads?member=${currentMember?.id || ''}`}
                icon={ThreadsIcon}
              >
                {t('Sidebar.threads')}
              </SidebarItemLink>

              <SidebarThreads />

              <SidebarItemLink
                className="userflow-sidebar-tasks"
                to={`${rootPath}tasks?member=${currentMember?.id || ''}`}
                icon={TasksIcon}
              >
                {t('Sidebar.tasks')}
              </SidebarItemLink>

              <SidebarTasks />
            </>
          )}
        </Box>
      )}

      {searchModal.isOpen && (
        <SearchGlobalModal
          isOpen
          onClose={() => {
            searchModal.onClose()
            expand.onClose()
          }}
        />
      )}
    </SidebarLayout>
  )
}
