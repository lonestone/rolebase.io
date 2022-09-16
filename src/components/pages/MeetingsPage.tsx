// Fix for fullcalendar with Vite
// Must be imported first
import '@fullcalendar/react/dist/vdom'

import {
  subscribeMeetingsByDates,
  updateMeetingDates,
} from '@api/entities/meetings'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ColorMode,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import MeetingEditModal from '@components/organisms/meeting/MeetingEditModal'
import MeetingExportModal from '@components/organisms/meeting/MeetingExportModal'
import MeetingModal from '@components/organisms/meeting/MeetingModal'
import {
  DateSelectArg,
  DatesSetArg,
  EventChangeArg,
  EventClickArg,
} from '@fullcalendar/common'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar, { EventInput } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import useCurrentMember from '@hooks/useCurrentMember'
import useEntitiesFilterMenu from '@hooks/useEntitiesFilterMenu'
import useFilterEntities from '@hooks/useFilterEntities'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import useSubscription from '@hooks/useSubscription'
import { enrichCircleWithRole } from '@shared/helpers/enrichCirclesWithRoles'
import { EntityFilters } from '@shared/model/types'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiPlus, FiUpload } from 'react-icons/fi'

// Load additional CSS after all imports
import 'src/fullcalendar.css'

const getColors = (mode: ColorMode) => ({
  bgNotStarted:
    mode === 'light'
      ? 'var(--chakra-colors-blue-100)'
      : 'var(--chakra-colors-blue-800)',
  bgStarted:
    mode === 'light'
      ? 'var(--chakra-colors-green-100)'
      : 'var(--chakra-colors-green-800)',
  bgEnded:
    mode === 'light'
      ? 'var(--chakra-colors-gray-100)'
      : 'var(--chakra-colors-gray-550)',
})

export default function MeetingsPage() {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const isMember = useOrgMember()
  const { colorMode } = useColorMode()
  const colors = useMemo(() => getColors(colorMode), [colorMode])
  const getCircleById = useStoreState((state) => state.circles.getById)
  const roles = useStoreState((state) => state.roles.entries)
  const [isSmallScreen] = useMediaQuery('(max-width: 700px)')

  // Circles filter menu
  const {
    filter,
    value: filterValue,
    handleChange: handleFilterChange,
  } = useEntitiesFilterMenu()

  // Dates range
  const [datesRange, setDatesRange] = useState<[Date, Date] | undefined>(
    undefined
  )

  // Subscribe to meetings
  const orgId = useOrgId()

  // Subscribe to meetings
  const { data, error, loading } = useSubscription(
    orgId && datesRange
      ? subscribeMeetingsByDates(orgId, datesRange[0], datesRange[1])
      : undefined
  )

  // Filter meetings
  const meetings = useFilterEntities(filter, data)

  // Prepare events for Fullcalendar
  const events = useMemo(
    () =>
      meetings?.map((meeting): EventInput => {
        let roleName = undefined

        // Add role name to title
        const circle = getCircleById(meeting.circleId)
        if (circle && roles) {
          const circleWithRole = enrichCircleWithRole(circle, roles)
          roleName = circleWithRole?.role.name
        }

        const title = `${roleName} - ${meeting.title}`

        // Can move event or change duration?
        const isStarted = meeting.currentStepId !== null
        const isNotStarted = !isStarted && !meeting.ended
        const canEditConfig = isNotStarted
        // TODO: Use participants like in MeetingContent
        // const canEditConfig = isNotStarted && (isParticipant || isInitiator)

        return {
          id: meeting.id,
          title,
          start: meeting.startDate.toDate(),
          end: meeting.endDate.toDate(),
          backgroundColor: isNotStarted
            ? colors.bgNotStarted
            : isStarted
            ? colors.bgStarted
            : colors.bgEnded,
          editable: canEditConfig,
        }
      }),
    [meetings, roles, colors]
  )

  const handleCreate = useCallback(() => {
    setStartDate(undefined)
    onCreateOpen()
  }, [])

  const handleCreated = useCallback((id: string) => {
    setMeetingId(id)
    onMeetingOpen()
  }, [])

  const handleOpenCurrentMeeting = useCallback(() => {
    if (!currentMember?.meetingId) return
    setMeetingId(currentMember?.meetingId)
    onMeetingOpen()
  }, [currentMember?.meetingId])

  const handleEventClick = useCallback(
    ({ event }: EventClickArg) => {
      const meeting = meetings?.find((m) => m.id === event.id)
      if (!meeting) return
      setMeetingId(meeting.id)
      onMeetingOpen()
    },
    [meetings]
  )

  const handleDateClick = useCallback(
    ({ date }: { date: Date }) => {
      setStartDate(date)
      onCreateOpen()
    },
    [meetings]
  )

  const handleSelect = useCallback(({ start, end }: DateSelectArg) => {
    setStartDate(start)
    setDuration(Math.round((end.getTime() - start.getTime()) / (1000 * 60)))
    onCreateOpen()
  }, [])

  const handleDatesChange = useCallback(
    ({ start, end }: DatesSetArg) => {
      setDatesRange([start, end])
    },
    [meetings]
  )

  const handleEventChange = useCallback(({ event }: EventChangeArg) => {
    if (!event.start || !event.end) return
    updateMeetingDates(event.id, event.start, event.end)
  }, [])

  // Meeting Modal
  const [meetingId, setMeetingId] = useState<string | undefined>()
  const {
    isOpen: isMeetingOpen,
    onOpen: onMeetingOpen,
    onClose: onMeetingClose,
  } = useDisclosure()

  // Create meeting Modal
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [duration, setDuration] = useState<number>(30)
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  // Export Modal
  const {
    isOpen: isExportOpen,
    onOpen: onExportOpen,
    onClose: onExportClose,
  } = useDisclosure()

  return (
    <Flex h="100%" p={5} flexDirection="column">
      <Title>{t('MeetingsPage.heading')}</Title>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      <Flex mb={2} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('MeetingsPage.heading')}
        </Heading>

        <Spacer />

        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            size="sm"
            variant="ghost"
            rightIcon={<FiChevronDown />}
          >
            {t(`MeetingsPage.participation.${filter}` as any)}
          </MenuButton>
          <MenuList zIndex={2}>
            <MenuOptionGroup
              title={t('MeetingsPage.participation.title')}
              type="checkbox"
              value={filterValue}
              onChange={handleFilterChange}
            >
              <MenuItemOption value={EntityFilters.Invited}>
                {t('MeetingsPage.participation.Invited')}
              </MenuItemOption>
              <MenuItemOption value={EntityFilters.NotInvited}>
                {t('MeetingsPage.participation.NotInvited')}
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        <Button size="sm" ml={1} leftIcon={<FiUpload />} onClick={onExportOpen}>
          {t('MeetingsPage.export')}
        </Button>

        {isMember && (
          <Button
            size="sm"
            colorScheme="blue"
            ml={1}
            leftIcon={<FiPlus />}
            onClick={handleCreate}
          >
            {t('MeetingsPage.create')}
          </Button>
        )}
      </Flex>

      {currentMember?.meetingId && (
        <Alert status="info" mb={2} maxW={400}>
          <AlertIcon />
          <AlertTitle>{t('MeetingsPage.current')}</AlertTitle>
          <Spacer />
          <Button ml={3} colorScheme="blue" onClick={handleOpenCurrentMeeting}>
            {t('MeetingsPage.openCurrent')}
          </Button>
        </Alert>
      )}

      <Box flex={1}>
        <FullCalendar
          events={events}
          height="100%"
          locale="fr"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          initialView={isSmallScreen ? 'listWeek' : 'timeGridWeek'}
          scrollTime="08:00:00"
          weekends={false}
          allDaySlot={false}
          nowIndicator
          editable={isMember}
          selectable={isMember}
          eventAllow={() => isMember}
          selectAllow={() => isMember}
          dateClick={isMember ? handleDateClick : undefined}
          select={handleSelect}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
          datesSet={handleDatesChange}
        />
      </Box>

      {isMeetingOpen && meetingId && (
        <MeetingModal id={meetingId} isOpen onClose={onMeetingClose} />
      )}

      {isCreateOpen && (
        <MeetingEditModal
          defaultStartDate={startDate}
          defaultDuration={duration}
          isOpen
          onCreate={handleCreated}
          onClose={onCreateClose}
        />
      )}

      {isExportOpen && <MeetingExportModal isOpen onClose={onExportClose} />}
    </Flex>
  )
}
