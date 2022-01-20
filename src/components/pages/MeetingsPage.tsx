import {
  subscribeMeetingsByDates,
  updateMeetingDates,
} from '@api/entities/meetings'
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import MeetingEditModal from '@components/organisms/modals/MeetingEditModal'
import MeetingExportModal from '@components/organisms/modals/MeetingExportModal'
import MeetingModal from '@components/organisms/modals/MeetingModal'
import {
  DatesSetArg,
  EventChangeArg,
  EventClickArg,
} from '@fullcalendar/common'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar, { EventContentArg, EventInput } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import useEntitiesFilterMenu from '@hooks/useEntitiesFilterMenu'
import useFilterEntities from '@hooks/useFilterEntities'
import useSubscription from '@hooks/useSubscription'
import { enrichCircleWithRole } from '@shared/helpers/enrichCirclesWithRoles'
import { EntityFilters } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo, useState } from 'react'
import { FiChevronDown, FiPlus, FiUpload } from 'react-icons/fi'
import { mainColor } from 'src/theme'

const colors = {
  text: 'black',
  bgNotStarted: mainColor('85%'),
  bgStarted: 'hsl(144deg 76% 85%)',
  bgEnded: 'hsl(192deg 34% 92%)',
  border: 'transparent',
  bgCircleName: mainColor('93%'),
}

export default function MeetingsPage() {
  const getCircleById = useStoreState((state) => state.circles.getById)
  const roles = useStoreState((state) => state.roles.entries)

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
  const orgId = useStoreState((state) => state.orgs.currentId)

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
        let title = meeting.title
        let roleName = undefined

        // Add role name to title
        const circle = getCircleById(meeting.circleId)
        if (circle && roles) {
          const circleWithRole = enrichCircleWithRole(circle, roles)
          roleName = circleWithRole?.role.name
        }

        // Can move event or change duration?
        const isNotStarted = !meeting.ended && meeting.currentStepId === null
        const canEditConfig = isNotStarted
        // TODO: Use participants like in MeetingContent
        // const canEditConfig = isNotStarted && (isParticipant || isInitiator)

        return {
          id: meeting.id,
          title,
          start: meeting.startDate.toDate(),
          end: meeting.endDate.toDate(),
          backgroundColor: meeting.ended
            ? colors.bgEnded
            : meeting.currentStepId !== null
            ? colors.bgStarted
            : colors.bgNotStarted,
          textColor: colors.text,
          extendedProps: {
            roleName,
          },
          editable: canEditConfig,
        }
      }),
    [meetings, roles]
  )

  // Customize event title
  const handleEventContent = useCallback(
    (eventContent: EventContentArg) => {
      const {
        title,
        extendedProps: { roleName },
      } = eventContent.event
      const view = eventContent.view.type
      return {
        html: `
          <div style="overflow: hidden;">
            <span style="
                padding: 2px 4px;
              ">
              ${title}
            </span>
            ${view === 'listWeek' ? '' : '<br />'}
            <div style="
                width: fit-content;
                display: inline-block;
                background: ${colors.bgCircleName};
                padding: 2px 4px;
                border-radius: 10px;
              ">
              ${roleName}
            </div>
          </div>`,
      }
    },
    [roles]
  )

  const handleCreate = useCallback(() => {
    setStartDate(undefined)
    onCreateOpen()
  }, [])

  const handleCreated = useCallback((id: string) => {
    setMeetingId(id)
    onMeetingOpen()
  }, [])

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
    <Flex flex={1} p={5} flexDirection="column">
      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      <Flex mb={1} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          Réunions
        </Heading>

        <Spacer />

        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            size="sm"
            variant="ghost"
            rightIcon={<FiChevronDown />}
          >
            Filtres
          </MenuButton>
          <MenuList zIndex={2}>
            <MenuOptionGroup
              title="Participation"
              type="checkbox"
              value={filterValue}
              onChange={handleFilterChange}
            >
              <MenuItemOption value={EntityFilters.Invited}>
                Mes réunions
              </MenuItemOption>
              <MenuItemOption value={EntityFilters.NotInvited}>
                Autres réunions
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        <Button size="sm" ml={1} leftIcon={<FiUpload />} onClick={onExportOpen}>
          Exporter
        </Button>

        <Button size="sm" ml={1} leftIcon={<FiPlus />} onClick={handleCreate}>
          Nouvelle réunion
        </Button>
      </Flex>

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
          initialView="timeGridWeek"
          scrollTime="08:00:00"
          weekends={false}
          allDaySlot={false}
          nowIndicator
          editable
          eventContent={handleEventContent}
          dateClick={handleDateClick}
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
          isOpen
          onCreate={handleCreated}
          onClose={onCreateClose}
        />
      )}

      {isExportOpen && <MeetingExportModal isOpen onClose={onExportClose} />}
    </Flex>
  )
}
