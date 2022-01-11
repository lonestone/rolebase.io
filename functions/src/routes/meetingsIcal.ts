import * as express from 'express'
import { ICalCalendar } from 'ical-generator'
import { collections } from '../firebase'
import settings from '../settings'

export const meetingsIcalRoute: express.RequestHandler = async (req, res) => {
  const { orgId } = req.query

  if (typeof orgId !== 'string') {
    res.status(400).send('orgId is required')
    return
  }

  // Get org
  const orgSnapshot = await collections.orgs.doc(orgId).get()
  const org = orgSnapshot.data()

  if (!org) {
    res.status(404).send('Org not found')
    return
  }

  // Setup calendar
  const cal = new ICalCalendar()
  cal.name(`Réunions ${org.name}`)

  // Get meetings
  const meetingsSnapshot = await collections.meetings
    .where('orgId', '==', orgId)
    .get()

  // Add events
  meetingsSnapshot.docs.forEach((doc) => {
    const meeting = doc.data()
    cal.createEvent({
      start: meeting.startDate.toDate(),
      end: meeting.endDate.toDate(),
      summary: `Réunion ${meeting.title}`,
      url: `${settings.url}/orgs/${orgId}/meetings/${doc.id}`,
    })
  })

  res.set('Content-Type', 'text/calendar; charset=utf-8')
  res.set('Content-Disposition', 'attachment; filename=meetings.ics')
  res.send(cal.toString())
}
