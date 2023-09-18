import { Text, useMediaQuery } from '@chakra-ui/react'
import { CalendarOptions, DayHeaderContentArg } from '@fullcalendar/core'
import localeFr from '@fullcalendar/core/locales/fr'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import useDateLocale from '@hooks/useDateLocale'
import { format } from 'date-fns'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

// Load additional CSS after all imports
import 'src/fullcalendar.css'

// Dirty fix to avoid collision with dayGridPlugin's id
rrulePlugin.id = '0'

const locales = [localeFr]

const plugins = [
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
  rrulePlugin,
]

const headerToolbar = {
  left: 'prev,next today',
  center: 'title',
  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
}

export default function Calendar(props: CalendarOptions) {
  const {
    i18n: { language },
  } = useTranslation()
  const dateLocale = useDateLocale()
  const [isSmallScreen] = useMediaQuery('(max-width: 700px)')

  const dayHeaderContent = useCallback(
    ({ date, isToday, view }: DayHeaderContentArg) => (
      <>
        {view.type === 'listWeek' ? (
          <Text
            fontSize="sm"
            fontWeight="bold"
            textAlign="left"
            color={isToday ? 'brand' : 'gray.500'}
          >
            {format(date, 'eeee', {
              locale: dateLocale,
            }).toUpperCase()}
          </Text>
        ) : (
          <Text
            fontSize="sm"
            fontWeight="normal"
            color={isToday ? 'brand' : 'gray.500'}
          >
            {format(date, 'eee', {
              locale: dateLocale,
            })
              .substring(0, 3)
              .toUpperCase()}
          </Text>
        )}

        {(view.type === 'timeGridWeek' || view.type === 'timeGridDay') && (
          <Text
            fontSize="3xl"
            color={isToday ? 'brand' : 'gray.700'}
            _dark={{
              color: isToday ? 'brand' : 'gray.300',
            }}
          >
            {format(date, 'd', { locale: dateLocale })}
          </Text>
        )}
      </>
    ),
    []
  )

  return (
    <FullCalendar
      height="100%"
      locale={language}
      locales={locales}
      plugins={plugins}
      headerToolbar={headerToolbar}
      titleFormat={{
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }}
      slotLabelContent={({ date }) => '  ' + (date.getHours() || '')}
      dayHeaderContent={dayHeaderContent}
      initialView={isSmallScreen ? 'listWeek' : 'timeGridWeek'}
      scrollTime="08:00:00"
      weekends={false}
      allDaySlot={false}
      nowIndicator
      {...props}
    />
  )
}
