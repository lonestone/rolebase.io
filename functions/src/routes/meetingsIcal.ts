import { CircleWithRoleEntry } from '@shared/circle'
import { getParticipantCircles } from '@shared/helpers/getParticipantCircles'
import * as express from 'express'
import { ICalCalendar } from 'ical-generator'
import { collections } from '../firebase'
import { generateMeetingToken } from '../functions/getMeetingsToken'
import settings from '../settings'
import { getQuerySnapshotData } from '../utils'

export const meetingsIcalRoute: express.RequestHandler = async (req, res) => {
  const { orgId, token, memberId, circleId } = req.query

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

  // Get member's circles
  let memberCircles: CircleWithRoleEntry[] | undefined
  if (memberId) {
    const circles = getQuerySnapshotData(
      await collections.circles.where('orgId', '==', orgId).get()
    )
    const roles = getQuerySnapshotData(
      await collections.roles.where('orgId', '==', orgId).get()
    )
    memberCircles = getParticipantCircles(memberId, circles, roles)
  }

  // Get meetings
  const meetings = getQuerySnapshotData(
    await collections.meetings.where('orgId', '==', orgId).get()
  ).filter((meeting) => {
    if (memberId) {
      // Filter by member
      return (
        meeting.participantsMembersIds.includes(memberId) ||
        memberCircles?.some((c) => c.id === meeting.circleId)
      )
    } else if (circleId) {
      // Filter by circle
      return meeting.circleId === circleId
    }
    return true
  })

  // Setup calendar
  const cal = new ICalCalendar()
  cal.name(`Réunions ${org.name}`)

  // Add events
  for (const meeting of meetings) {
    cal.createEvent({
      start: meeting.startDate.toDate(),
      end: meeting.endDate.toDate(),
      summary: `Réunion ${meeting.title}`,
      url: `${settings.url}/orgs/${orgId}/meetings/${meeting.id}`,
    })
  }

  res.set('Content-Type', 'text/calendar; charset=utf-8')
  res.set('Content-Disposition', 'attachment; filename=meetings.ics')
  res.send(cal.toString())
}
