import * as express from 'express'
import * as functions from 'firebase-functions'
import './fixTsPaths'
import { meetingsIcalRoute } from './routes/meetingsIcal'
import { migration } from './routes/migration'
export { acceptMemberInvitation } from './functions/acceptMemberInvitation'
export { createOrg } from './functions/createOrg'
export { inviteMember } from './functions/inviteMember'
export { updateMemberRole } from './functions/updateMemberRole'

const app = express()

// Automatically allow cross-origin requests
// app.use(cors({ origin: true }))

// Routes
app.get('/meetings.ics', meetingsIcalRoute)
app.get('/migration', migration)

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app)
