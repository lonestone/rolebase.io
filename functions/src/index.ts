export { acceptMemberInvitation } from './functions/acceptMemberInvitation'
export { inviteMember } from './functions/inviteMember'
import * as express from 'express'
import * as functions from 'firebase-functions'
import { meetingsIcalRoute } from './routes/meetingsIcal'

const app = express()

// Automatically allow cross-origin requests
// app.use(cors({ origin: true }))

// Routes
app.get('/meetings.ics', meetingsIcalRoute)

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app)
