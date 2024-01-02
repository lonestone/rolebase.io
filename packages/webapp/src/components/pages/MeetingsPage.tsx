import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import useFilterEntitiesByCircle from '@hooks/useFilterEntitiesByCircle'
import useFilterScopedEntitiesByMember from '@hooks/useFilterScopedEntitiesByMember'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import useUpdatableQueryParams from '@hooks/useUpdatableQueryParams'
import useUserMetadata from '@hooks/useUserMetadata'
import Calendar from '@molecules/Calendar'
import CircleAndMemberFilters from '@molecules/CircleAndMemberFilters'
import ScrollableLayout from '@molecules/ScrollableLayout'
import MeetingEditModal from '@organisms/meeting/MeetingEditModal'
import MeetingExportModal from '@organisms/meeting/MeetingExportModal'
import MeetingModal from '@organisms/meeting/MeetingModal'
import MeetingOpenCurrent from '@organisms/meeting/MeetingOpenCurrent'
import MeetingRecurringEditModal from '@organisms/meeting/MeetingRecurringEditModal'
import MeetingRecurringListModal from '@organisms/meeting/MeetingRecurringListModal'
import MeetingRecurringModal from '@organisms/meeting/MeetingRecurringModal'
import MeetingTemplateListModal from '@organisms/meeting/MeetingTemplateListModal'
import { circleColor } from '@shared/helpers/circleColor'
import {
  dateToTimeZone,
  excludeMeetingsFromRRule,
  getDateFromUTCDate,
  getUTCDateFromDate,
} from '@shared/helpers/rrule'
import { truthy } from '@shared/helpers/truthy'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { RRule } from 'rrule'
import {
  AppsIcon,
  CopyIcon,
  CreateIcon,
  ExportIcon,
  HideIcon,
  MeetingRecurringIcon,
  SettingsIcon,
  ShowIcon,
} from 'src/icons'

type Params = {
  member: string
  circle: string
}

export default function MeetingsPage() {
  const { t } = useTranslation()
  const { params, changeParams } = useUpdatableQueryParams<Params>()
  const isMember = useOrgMember()
  const circles = useStoreState((state) => state.org.circles)

  // Member param
  const memberId =
    params.member && typeof params.member === 'string'
      ? params.member
      : undefined
  const handleMemberChange = (member: string | undefined) =>
    changeParams({ member })

  // Circle param
  const circleId =
    params.circle && typeof params.circle === 'string'
      ? params.circle
      : undefined
  const handleCircleChange = (circle: string | undefined) =>
    changeParams({ circle })

  // Colors
  const { colorMode } = useColorMode()
  const colorLightness = colorMode === 'light' ? '92%' : '25%'

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
      filters: [
        {
          archived: { _eq: false },
        },
        ...(circleId ? [{ circleId: { _eq: circleId } }] : []),
        ...(memberId
          ? [{ meeting_attendees: { memberId: { _eq: memberId } } }]
          : []),
      ],
      recurringFilters: circleId ? [{ circleId: { _eq: circleId } }] : [],
    },
  })

  // Filter meetings
  const meetings = data?.org_by_pk?.meetings

  // Filter recurring meetings
  const meetingsRecurringByScope = useFilterScopedEntitiesByMember(
    data?.org_by_pk?.meetings_recurring,
    memberId
  )
  const meetingsRecurring = useFilterEntitiesByCircle(
    meetingsRecurringByScope,
    circleId
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
                    dateToTimeZone(getDateFromUTCDate(nextDate), timezone)
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
  const { metadata, setMetadata } = useUserMetadata()
  const weekend = metadata?.calendarShowWeekend ?? false

  // Modals
  const meetingModal = useDisclosure()
  const createModal = useDisclosure()
  const templatesModal = useDisclosure()
  const recurringModal = useDisclosure()
  const recurringEditModal = useDisclosure()
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

      <ScrollableLayout
        header={
          <Flex ml={5} w="100%" alignItems="center" flexWrap="wrap">
            <Heading as="h1" size="lg">
              {t('MeetingsPage.heading')}
            </Heading>

            <CircleAndMemberFilters
              circleId={circleId}
              memberId={memberId}
              ml={5}
              my={2}
              onCircleChange={handleCircleChange}
              onMemberChange={handleMemberChange}
            />

            <Spacer />

            <Menu placement="bottom-end">
              <MenuButton
                as={Button}
                className="userflow-meetings-actions"
                size="sm"
                variant="outline"
                fontWeight="normal"
                leftIcon={<SettingsIcon size={20} />}
                my={2}
              >
                {t('MeetingsPage.settings')}
              </MenuButton>
              <MenuList
                fontFamily="body"
                fontSize="1rem"
                fontWeight="normal"
                zIndex={1000}
              >
                <MenuItem
                  icon={<CopyIcon size={20} />}
                  onClick={templatesModal.onOpen}
                >
                  {t('MeetingsPage.templates')}
                </MenuItem>
                <MenuItem
                  icon={<MeetingRecurringIcon size={20} />}
                  onClick={recurringListModal.onOpen}
                >
                  {t('MeetingsPage.recurring')}
                </MenuItem>
                <MenuItem
                  icon={
                    weekend ? <HideIcon size={20} /> : <ShowIcon size={20} />
                  }
                  onClick={() => setMetadata('calendarShowWeekend', !weekend)}
                >
                  {weekend
                    ? t('MeetingsPage.hideWeekend')
                    : t('MeetingsPage.showWeekend')}
                </MenuItem>
                <MenuItem
                  className="userflow-meetings-export"
                  icon={<ExportIcon size={20} />}
                  onClick={exportModal.onOpen}
                >
                  {t('MeetingsPage.export')}
                </MenuItem>
                <Link to="/apps">
                  <MenuItem
                    className="userflow-meetings-apps"
                    icon={<AppsIcon size={20} />}
                  >
                    {t('MeetingsPage.apps')}
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>

            {isMember && (
              <Button
                className="userflow-meetings-create"
                size="sm"
                colorScheme="blue"
                ml={5}
                my={2}
                leftIcon={<CreateIcon size={20} />}
                onClick={handleCreate}
              >
                {t('MeetingsPage.create')}
              </Button>
            )}
          </Flex>
        }
      >
        <Box py={5} h="100%">
          {loading && <Loading active center />}
          <TextErrors errors={[error]} />

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
      </ScrollableLayout>

      {meetingModal.isOpen && meetingId && (
        <MeetingModal id={meetingId} isOpen onClose={meetingModal.onClose} />
      )}

      {createModal.isOpen && (
        <MeetingEditModal
          defaultStartDate={startDate}
          defaultDuration={duration}
          isOpen
          onCreate={handleCreated}
          onRecurring={() => {
            createModal.onClose()
            recurringEditModal.onOpen()
          }}
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

      {recurringEditModal.isOpen && (
        <MeetingRecurringEditModal
          isOpen
          onClose={recurringEditModal.onClose}
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
