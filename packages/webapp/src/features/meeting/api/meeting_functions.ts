import { fn } from '@/common/api/functions'
import settings from 'src/settings'

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
  return `${settings.backendUrl}/meeting/ical?token=${token}&lang=${lang}&orgId=${orgId}&memberId=${memberId}`
}
