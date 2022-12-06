// Fix for fullcalendar with Vite
// Must be imported first
import '@fullcalendar/react/dist/vdom'

import { useMediaQuery } from '@chakra-ui/react'
import { CalendarOptions } from '@fullcalendar/common'
import localeFr from '@fullcalendar/core/locales/fr'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import React from 'react'
import { useTranslation } from 'react-i18next'

// Load additional CSS after all imports
import 'src/fullcalendar.css'

// Dirty fix to avoid collision with dayGridPlugin's id
rrulePlugin.id = '0'

const locales = [localeFr]

export default function Calendar(props: CalendarOptions) {
  const {
    i18n: { language },
  } = useTranslation()
  const [isSmallScreen] = useMediaQuery('(max-width: 700px)')

  return (
    <FullCalendar
      height="100%"
      locale={language}
      locales={locales}
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        interactionPlugin,
        rrulePlugin,
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
      {...props}
    />
  )
}
