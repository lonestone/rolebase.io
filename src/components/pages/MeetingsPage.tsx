import { updateMeeting } from '@api/entities/meetings'
import { Timestamp } from '@api/firebase'
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
import { EventChangeArg, EventClickArg } from '@fullcalendar/common'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import useEntitiesFilterMenu from '@hooks/useEntitiesFilterMenu'
import useMeetingsList from '@hooks/useMeetingsList'
import { MeetingEntry } from '@shared/meeting'
import { EntityFilters } from '@shared/types'
import React, { useCallback, useState } from 'react'
import { FiChevronDown, FiPlus } from 'react-icons/fi'

export default function MeetingsPage() {
  // Circles filter menu
  const {
    filter,
    value: filterValue,
    handleChange: handleFilterChange,
  } = useEntitiesFilterMenu()

  // Subscribe to meetings
  const { meetings, error, loading } = useMeetingsList(filter, false)

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

  const handleChange = useCallback(({ event }: EventChangeArg) => {
    if (!event.start || !event.end) return
    updateMeeting(event.id, {
      startDate: Timestamp.fromDate(event.start),
      endDate: Timestamp.fromDate(event.end),
    })
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
          events={meetings?.map((meeting) => ({
            id: meeting.id,
            title: meeting.title,
            start: meeting.startDate.toDate(),
            end: meeting.endDate.toDate(),
          }))}
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
          eventChange={handleChange}
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
