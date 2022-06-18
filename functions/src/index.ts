import express from 'express'
import * as functions from 'firebase-functions'
import './fixTsPaths'
import { meetingsIcalRoute } from './routes/meetingsIcal'
import { migration } from './routes/migrations/migration-example'
export { acceptMemberInvitation } from './functions/acceptMemberInvitation'
export { createOrg } from './functions/createOrg'
export { getMeetingsToken } from './functions/getMeetingsToken'
export { inviteMember } from './functions/inviteMember'
export { updateMemberRole } from './functions/updateMemberRole'

const app = express()

// Routes
app.get('/meetings.ics', meetingsIcalRoute)
app.get('/migration', migration)

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app)

// Grant super admin powers to some user
// import { setUserClaim } from './helpers/setUserClaim'
// setUserClaim('<user_id>', { superAdmin: true })
