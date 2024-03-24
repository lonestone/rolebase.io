import { router } from '../../trpc'
import generateMeetingSummary from './generateMeetingSummary'
import generateRole from './generateRole'

export default router({
  generateMeetingSummary,
  generateRole,
})
