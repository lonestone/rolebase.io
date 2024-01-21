import settings from 'src/settings'
import { fn } from '../../common/api/functions'

export const getMeetingsToken = fn<{ orgId: string }, string>(
  'meetings/getMeetingsToken'
)

// Generate a meeting summary with AI
export const generateMeetingSummary = fn<
  { meetingId: string; lang: string },
  string
>('meetings/generateMeetingSummary')

export function getMeetingsIcalUrl(
  orgId: string | undefined,
  token: string,
  lang: string,
  memberId: string
): string {
  return `${settings.functionsUrl}routes/meetingsIcal?token=${token}&lang=${lang}&orgId=${orgId}&memberId=${memberId}`
}
