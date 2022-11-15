// Fix for fullcalendar with Vite
// Must be imported first
import '@fullcalendar/react/dist/vdom'

import {
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
  Wrap,
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
import useEntitiesFilterMenu from '@hooks/useEntitiesFilterMenu'
import useFilterEntities from '@hooks/useFilterEntities'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import { enrichCircleWithRole } from '@shared/helpers/enrichCirclesWithRoles'
import { EntityFilters } from '@shared/model/types'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiPlus, FiUpload } from 'react-icons/fi'

// Load additional CSS after all imports
import MeetingOpenCurrent from '@components/organisms/meeting/MeetingOpenCurrent'
import { MeetingEntry } from '@shared/model/meeting'
import 'src/fullcalendar.css'
import {
  useSubscribeMeetingsByDatesSubscription,
  useUpdateMeetingMutation,
} from 'src/graphql.generated'

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
  const { data, error, loading } = useSubscribeMeetingsByDatesSubscription({
    skip: !orgId || !datesRange,
    variables: {
      orgId: orgId!,
      fromDate: datesRange?.[0].toISOString()!,
      toDate: datesRange?.[1].toISOString()!,
    },
  })

  // Filter meetings
  const meetings = useFilterEntities(
    filter,
    (data?.meeting || undefined) as MeetingEntry[] | undefined
  )

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
          start: new Date(meeting.startDate),
          end: new Date(meeting.endDate),
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
    createModal.onOpen()
  }, [])

  const handleCreated = useCallback((id: string) => {
    setMeetingId(id)
    meetingModal.onOpen()
  }, [])

  const handleEventClick = useCallback(
    ({ event }: EventClickArg) => {
      const meeting = meetings?.find((m) => m.id === event.id)
      if (!meeting) return
      setMeetingId(meeting.id)
      meetingModal.onOpen()
    },
    [meetings]
  )

  const handleDateClick = useCallback(
    ({ date }: { date: Date }) => {
      setStartDate(date)
      createModal.onOpen()
    },
    [meetings]
  )

  const handleSelect = useCallback(({ start, end }: DateSelectArg) => {
    setStartDate(start)
    setDuration(Math.round((end.getTime() - start.getTime()) / (1000 * 60)))
    createModal.onOpen()
  }, [])

  const handleDatesChange = useCallback(
    ({ start, end }: DatesSetArg) => {
      setDatesRange([start, end])
    },
    [meetings]
  )

  const [updateMeeting] = useUpdateMeetingMutation()

  const handleEventChange = useCallback(({ event }: EventChangeArg) => {
    if (!event.start || !event.end) return
    updateMeeting({
      variables: {
        id: event.id,
        values: {
          startDate: event.start.toISOString(),
          endDate: event.end.toISOString(),
        },
      },
    })
  }, [])

  // Meeting id for modal
  const [meetingId, setMeetingId] = useState<string | undefined>()

  // Dates for meeting creation modal
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [duration, setDuration] = useState<number>(30)

  // Modals
  const meetingModal = useDisclosure()
  const createModal = useDisclosure()
  const exportModal = useDisclosure()
  const currentMeetingModal = useDisclosure({ defaultIsOpen: true })

  return (
    <Flex h="100%" p={5} flexDirection="column">
      <Title>{t('MeetingsPage.heading')}</Title>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      <Wrap mb={2} alignItems="center" flexWrap="wrap">
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

        <Button
          size="sm"
          ml={1}
          leftIcon={<FiUpload />}
          onClick={exportModal.onOpen}
        >
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
      </Wrap>

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

      {meetingModal.isOpen && meetingId && (
        <MeetingModal id={meetingId} isOpen onClose={meetingModal.onClose} />
      )}

      {createModal.isOpen && (
        <MeetingEditModal
          defaultStartDate={startDate}
          defaultDuration={duration}
          isOpen
          onCreate={handleCreated}
          onClose={createModal.onClose}
        />
      )}

      {exportModal.isOpen && (
        <MeetingExportModal isOpen onClose={exportModal.onClose} />
      )}

      {currentMeetingModal.isOpen && (
        <MeetingOpenCurrent isOpen onClose={currentMeetingModal.onClose} />
      )}
    </Flex>
  )
}
