import { router } from '../../trpc'
import createNextRecurringMeetings from './createNextRecurringMeetings'
import endOldMeetings from './endOldMeetings'
import sendDigestEmails from './sendDigestEmails'

export default router({
  createNextRecurringMeetings,
  endOldMeetings,
  sendDigestEmails,
})
