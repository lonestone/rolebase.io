import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import {
  DateSelectArg,
  DatesSetArg,
  EventChangeArg,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core'
import { useMeetingsByDatesSubscription, useUpdateMeetingMutation } from '@gql'
import useEntitiesFilterMenu from '@hooks/useEntitiesFilterMenu'
import useFilterEntities from '@hooks/useFilterEntities'
import useMemberPreferences from '@hooks/useMemberPreferences'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import Calendar from '@molecules/meeting/Calendar'
import MeetingEditModal from '@organisms/meeting/MeetingEditModal'
import MeetingExportModal from '@organisms/meeting/MeetingExportModal'
import MeetingModal from '@organisms/meeting/MeetingModal'
import MeetingOpenCurrent from '@organisms/meeting/MeetingOpenCurrent'
import MeetingRecurringListModal from '@organisms/meeting/MeetingRecurringListModal'
import MeetingRecurringModal from '@organisms/meeting/MeetingRecurringModal'
import MeetingTemplateListModal from '@organisms/meeting/MeetingTemplateListModal'
import {
  dateFromTimeZone,
  excludeMeetingsFromRRule,
  getDateFromUTCDate,
  getUTCDateFromDate,
} from '@shared/helpers/rrule'
import { EntityFilters } from '@shared/model/participants'
import { useStoreState } from '@store/hooks'
import { truthy } from '@utils/truthy'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiChevronDown,
  FiCopy,
  FiEye,
  FiEyeOff,
  FiMoreVertical,
  FiPlus,
  FiRepeat,
  FiUpload,
} from 'react-icons/fi'
import { RRule } from 'rrule'
import { circleColor } from 'src/theme'

export default function MeetingsPage() {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const circles = useStoreState((state) => state.org.circles)

  // Colors
  const { colorMode } = useColorMode()
  const colorLightness = colorMode === 'light' ? '92%' : '25%'

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
  const { data, error, loading } = useMeetingsByDatesSubscription({
    skip: !orgId || !datesRange,
    variables: {
      orgId: orgId!,
      fromDate: datesRange?.[0].toISOString()!,
      toDate: datesRange?.[1].toISOString()!,
    },
  })

  // Filter meetings
  const meetings = useFilterEntities(filter, data?.org_by_pk?.meetings)

  // Filter recurring meetings
  const meetingsRecurring = useFilterEntities(
    filter,
    data?.org_by_pk?.meetings_recurring
  )

  // Prepare events for Fullcalendar
  const events = useMemo(
    () =>
      // Add events from meetings
      meetings
        ?.map((meeting): EventInput => {
          const baseEvent = {
            id: meeting.id,
            start: new Date(meeting.startDate),
            end: new Date(meeting.endDate),
          }

          // Add role name to title
          const circle = circles?.find((c) => c.id === meeting.circleId)

          if (!circle) {
            console.error('Circle not found', meeting.circleId)
            return {
              ...baseEvent,
              title: meeting.title,
              backgroundColor: circleColor(colorLightness),
            }
          }

          const title = `${circle.role.name} - ${meeting.title}`

          // Can move event or change duration?
          const isStarted = meeting.currentStepId !== null
          const isNotStarted = !isStarted && !meeting.ended
          const canEditConfig = isNotStarted

          return {
            ...baseEvent,
            title,
            backgroundColor: circleColor(
              colorLightness,
              circle.role.colorHue ?? undefined
            ),
            editable: canEditConfig,
          }
        })

        // Add events from recurring meetings
        .concat(
          (meetingsRecurring || [])
            .map((mr): EventInput | undefined => {
              const rruleOrig = RRule.fromString(mr.rrule)
              const nextDate = rruleOrig.after(new Date())
              const timezone = rruleOrig.options.tzid
              if (!nextDate || !timezone) return undefined

              // Exclude dates of meetings from the serie
              const rrule = excludeMeetingsFromRRule(
                new RRule({
                  ...rruleOrig.origOptions,
                  // Change start date to next occurrence
                  dtstart: getUTCDateFromDate(
                    dateFromTimeZone(getDateFromUTCDate(nextDate), timezone)
                  ),
                }),
                mr.meetings
              ).toString()

              // Fix circle color (can be inherited from parents)
              const circle = circles?.find((c) => c.id === mr.circleId)
              const colorHue =
                circle?.role.colorHue ?? mr.circle.role.colorHue ?? undefined

              return {
                id: mr.id,
                title: `${mr.circle.role.name} - ${mr.template.title}`,
                rrule,
                duration: {
                  minutes: mr.duration,
                },
                backgroundColor: circleColor(colorLightness, colorHue),
                editable: false,
              }
            })
            .filter(truthy)
        ),
    [meetings, meetingsRecurring, circles, colorMode]
  )

  // Show/hide weekends
  const { preferences, setPreference } = useMemberPreferences()
  const weekend = preferences?.calendarShowWeekend ?? false

  // Modals
  const meetingModal = useDisclosure()
  const createModal = useDisclosure()
  const templatesModal = useDisclosure()
  const recurringModal = useDisclosure()
  const recurringListModal = useDisclosure()
  const exportModal = useDisclosure()
  const currentMeetingModal = useDisclosure({ defaultIsOpen: true })

  // Meeting id for modal
  const [meetingId, setMeetingId] = useState<string | undefined>()

  // Dates for meeting creation modal
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [duration, setDuration] = useState<number>(30)

  // Recurring meeting id and date for modal
  const [recurringId, setRecurringId] = useState<string | undefined>()
  const [recurringDate, setRecurringDate] = useState<Date | undefined>()

  // Handlers

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
      // Open meeting
      const meeting = meetings?.find((m) => m.id === event.id)
      if (meeting) {
        setMeetingId(meeting.id)
        meetingModal.onOpen()
        return
      }

      // Ope recurring meeting
      const meetingRecurring = meetingsRecurring?.find((m) => m.id === event.id)
      if (meetingRecurring && event.start) {
        setRecurringId(meetingRecurring.id)
        setRecurringDate(event.start)
        recurringModal.onOpen()
      }
    },
    [meetings, meetingsRecurring]
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

  return (
    <Flex h="100%" flexDirection="column">
      <Title>{t('MeetingsPage.heading')}</Title>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      <Flex p={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('MeetingsPage.heading')}
        </Heading>

        <Spacer />

        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            className="userflow-meetings-filter"
            size="sm"
            variant="outline"
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

        <Menu>
          <MenuButton
            as={IconButton}
            className="userflow-meetings-actions"
            size="sm"
            variant="ghost"
            icon={<FiMoreVertical />}
            aria-label={t('ActionsMenu.label')}
          />
          <MenuList
            fontFamily="body"
            fontSize="1rem"
            fontWeight="normal"
            zIndex={1000}
          >
            <MenuItem icon={<FiCopy />} onClick={templatesModal.onOpen}>
              {t('MeetingsPage.templates')}
            </MenuItem>
            <MenuItem icon={<FiRepeat />} onClick={recurringListModal.onOpen}>
              {t('MeetingsPage.recurring')}
            </MenuItem>
            <MenuItem
              icon={weekend ? <FiEyeOff /> : <FiEye />}
              onClick={() => setPreference('calendarShowWeekend', !weekend)}
            >
              {weekend
                ? t('MeetingsPage.hideWeekend')
                : t('MeetingsPage.showWeekend')}
            </MenuItem>
            <MenuItem
              className="userflow-meetings-export"
              icon={<FiUpload />}
              onClick={exportModal.onOpen}
            >
              {t('MeetingsPage.export')}
            </MenuItem>
          </MenuList>
        </Menu>

        {isMember && (
          <Button
            className="userflow-meetings-create"
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

      <Box flex={1}>
        <Calendar
          events={events}
          weekends={weekend}
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
          onRecurring={recurringListModal.onOpen}
          onClose={createModal.onClose}
        />
      )}

      {templatesModal.isOpen && (
        <MeetingTemplateListModal isOpen onClose={templatesModal.onClose} />
      )}

      {recurringModal.isOpen && recurringId && (
        <MeetingRecurringModal
          id={recurringId}
          defaultDate={recurringDate}
          isOpen
          onClose={recurringModal.onClose}
        />
      )}

      {recurringListModal.isOpen && (
        <MeetingRecurringListModal
          isOpen
          onClose={recurringListModal.onClose}
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
