import slugify from 'slugify'
import { MeetingFragment } from '../gql'

export default function generateJitsiUrl(
  meeting: MeetingFragment,
  roleName: string,
  displayName = ''
): string {
  const roomName = `${roleName} ${meeting.title} ${meeting.id}`
  return `https://meet.jit.si/${slugify(roomName, {
    strict: true,
  })}#userInfo.displayName=${encodeURIComponent(
    displayName
  )}&interfaceConfig.SHOW_CHROME_EXTENSION_BANNER=false`
}
