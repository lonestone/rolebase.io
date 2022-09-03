import express from 'express'
import * as functions from 'firebase-functions'
import './fixTsPaths'

// API Routes
import { meetingsIcalRoute } from './routes/meetingsIcal'
import { migration } from './routes/migrations/migration-example'

const app = express()

// Routes
app.get('/meetings.ics', meetingsIcalRoute)
app.get('/migration', migration)

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app)

// Grant super admin powers to some user
// import { setUserClaim } from './helpers/setUserClaim'
// setUserClaim('<user_id>', { superAdmin: true })

// Functions exports
export { acceptMemberInvitation } from './functions/acceptMemberInvitation'
export { createOrg } from './functions/createOrg'
export { getAlgoliaConfig } from './functions/getAlgoliaConfig'
export { getMagicbellConfig } from './functions/getMagicbellConfig'
export { getMeetingsToken } from './functions/getMeetingsToken'
export { inviteMember } from './functions/inviteMember'
export { searchReindexAll } from './functions/searchReindexAll'
export { sendNotification } from './functions/sendNotification'
export { updateMemberRole } from './functions/updateMemberRole'
export { updateOrgSlug } from './functions/updateOrgSlug'
// Search exports
export { onCircleUpdateSearch } from './search/circles'
export { onDecisionUpdateSearch } from './search/decisions'
export {
  onMeetingStepUpdateSearch,
  onMeetingUpdateSearch,
} from './search/meetings'
export { onMemberUpdateSearch } from './search/member'
export { onTaskUpdateSearch } from './search/tasks'
export { onThreadUpdateSearch } from './search/threads'
