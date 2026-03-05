import { router } from '../../trpc'
import createNextRecurringMeetings from './createNextRecurringMeetings'
import endOldMeetings from './endOldMeetings'
import resendInvitations from './resendInvitations'
import sendDigestEmails from './sendDigestEmails'

export default router({
  createNextRecurringMeetings,
  endOldMeetings,
  resendInvitations,
  sendDigestEmails,
})
