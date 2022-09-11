import { enrichCirclesWithRoles } from '@shared/helpers/enrichCirclesWithRoles'
import filterEntities from '@shared/helpers/filterEntities'
import { getParticipantCircles } from '@shared/helpers/getParticipantCircles'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { EntityFilters } from '@shared/model/types'
import * as express from 'express'
import i18next from 'i18next'
import { ICalCalendar } from 'ical-generator'
import { collections } from '../firebase'
import { generateMeetingToken } from '../functions/getMeetingsToken'
import { defaultLang } from '../i18n'
import settings from '../settings'
import { getQuerySnapshotData } from '../utils'

export const meetingsIcalRoute: express.RequestHandler = async (req, res) => {
  const { orgId, token, memberId, circleId, lang } = req.query

  if (typeof orgId !== 'string') {
    res.status(400).send('orgId is required')
    return
  }

  if (typeof token !== 'string') {
    res.status(400).send('token is required')
    return
  }

  if (typeof memberId !== 'string' && memberId !== undefined) {
    res.status(400).send('memberId must be a string')
    return
  }

  if (typeof circleId !== 'string' && circleId !== undefined) {
    res.status(400).send('circleId must be a string')
    return
  }

  // Locale
  const lng = typeof lang === 'string' ? lang : defaultLang

  // Validate token
  if (token !== generateMeetingToken(orgId)) {
    res.status(400).send('Invalid token')
    return
  }

  // Get org
  const orgSnapshot = await collections.orgs.doc(orgId).get()
  const org = orgSnapshot.data()

  if (!org) {
    res.status(404).send('Org not found')
    return
  }

  // Get roles and circles
  const circles = getQuerySnapshotData(
    await collections.circles
      .where('orgId', '==', orgId)
      .where('archived', '==', false)
      .get()
  )
  const roles = getQuerySnapshotData(
    await collections.roles
      .where('orgId', '==', orgId)
      .where('archived', '==', false)
      .get()
  )

  const circleswithRoles = enrichCirclesWithRoles(circles, roles)

  // Get member's circles
  let memberCircles: CircleWithRoleEntry[] | undefined
  if (memberId) {
    memberCircles = getParticipantCircles(memberId, circleswithRoles)
  }

  // Get meetings
  const orgMeetings = getQuerySnapshotData(
    await collections.meetings
      .where('orgId', '==', orgId)
      .where('archived', '==', false)
      .orderBy('startDate', 'asc')
      .get()
  )

  // Filter meetings
  const filter = inferFilter(memberId, circleId)

  const meetings = filterEntities(
    filter,
    orgMeetings,
    circleId,
    memberId,
    memberCircles?.map((c) => c.id)
  )

  // Setup calendar
  const cal = new ICalCalendar()
  cal.name(`Réunions ${org.name}`)

  const meetingsUrl = `${settings.url}/${org.slug || `orgs/${orgId}`}/meetings`

  // Add events
  for (const meeting of meetings) {
    const circle = circleswithRoles.find((c) => c.id === meeting.circleId)
    const url = `${meetingsUrl}/${meeting.id}`

    cal.createEvent({
      start: meeting.startDate.toDate(),
      end: meeting.endDate.toDate(),
      summary: i18next.t('meetingsIcal.meeting.title', {
        lng,
        interpolation: {
          escapeValue: false,
        },
        replace: {
          title: meeting.title,
          role: circle?.role.name,
        },
      }),
      description: url,
    })
  }

  res.set('Content-Type', 'text/calendar; charset=utf-8')
  res.set('Content-Disposition', 'attachment; filename=meetings.ics')
  res.send(cal.toString())
}

function inferFilter(memberId?: string, circleId?: string) {
  if (memberId) return EntityFilters.Invited
  if (circleId) return EntityFilters.Circle
  return EntityFilters.All
}
