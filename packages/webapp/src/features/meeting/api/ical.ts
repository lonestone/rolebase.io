import settings from 'src/settings'

export function getMeetingsIcalUrl(
  orgId: string | undefined,
  token: string,
  lang: string,
  memberId: string
): string {
  return `${settings.backendUrl}/meeting/ical?token=${token}&lang=${lang}&orgId=${orgId}&memberId=${memberId}`
}
