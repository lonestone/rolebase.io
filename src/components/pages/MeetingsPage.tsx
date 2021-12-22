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
import MeetingModal from '@components/organisms/modals/MeetingModal'
import {
  DatesSetArg,
  EventChangeArg,
  EventClickArg,
} from '@fullcalendar/common'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import useEntitiesFilterMenu from '@hooks/useEntitiesFilterMenu'
import useFilterEntities from '@hooks/useFilterEntities'
import useSubscription from '@hooks/useSubscription'
import { MeetingEntry } from '@shared/meeting'
import { EntityFilters } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo, useState } from 'react'
import { FiChevronDown, FiPlus } from 'react-icons/fi'

export default function MeetingsPage() {
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
      meetings?.map((meeting) => ({
        id: meeting.id,
        title: meeting.title,
        start: meeting.startDate.toDate(),
        end: meeting.endDate.toDate(),
        backgroundColor: 'hsl(192deg 76% 87%)',
        borderColor: 'hsl(192deg 76% 50%)',
        textColor: 'black',
      })),
    [meetings]
  )

  // Modal
  const [meeting, setMeeting] = useState<MeetingEntry | undefined>()
  const [startDate, setStartDate] = useState<Date | undefined>()
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  const handleCreate = useCallback(() => {
    setStartDate(undefined)
    setMeeting(undefined)
    onModalOpen()
  }, [])

  const handleEdit = useCallback(
    ({ event }: EventClickArg) => {
      const meeting = meetings?.find((m) => m.id === event.id)
      if (!meeting) return
      setStartDate(undefined)
      setMeeting(meeting)
      onModalOpen()
    },
    [meetings]
  )

  const handleDateClick = useCallback(
    ({ date }: { date: Date }) => {
      setStartDate(date)
      setMeeting(undefined)
      onModalOpen()
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

  return (
    <Box
      h="100vh"
      px={5}
      pb={5}
      pt="70px"
      display="flex"
      flexDirection="column"
    >
      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      <Flex mb={1}>
        <Heading as="h1" size="md">
          Réunions
        </Heading>

        <Spacer />

        <Menu closeOnSelect={false}>
          <MenuButton as={Button} variant="ghost" rightIcon={<FiChevronDown />}>
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

        <Button ml={1} leftIcon={<FiPlus />} onClick={handleCreate}>
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
          weekends={false}
          allDaySlot={false}
          nowIndicator
          editable
          dateClick={handleDateClick}
          scrollTime="08:00:00"
          eventClick={handleEdit}
          eventChange={handleEventChange}
          datesSet={handleDatesChange}
        />
      </Box>

      {isModalOpen && (
        <MeetingModal
          meeting={meeting}
          defaultStartDate={startDate}
          isOpen
          onClose={onModalClose}
        />
      )}
    </Box>
  )
}
