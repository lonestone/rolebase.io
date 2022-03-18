import { CircleWithRoleEntry } from '@shared/circle'
import { MeetingEntry } from '@shared/meeting'
import { MemberEntry } from '@shared/member'
import slugify from 'slugify'

export default function generateVideoConfUrl(
  meeting: MeetingEntry,
  circle: CircleWithRoleEntry,
  currentMember: MemberEntry
) {
  const roomName = `${circle.role.name} ${meeting.title} ${meeting.id}`
  return `https://meet.jit.si/${slugify(roomName, {
    strict: true,
  })}#userInfo.displayName="${encodeURIComponent(
    currentMember.name
  )}"&interfaceConfig.SHOW_CHROME_EXTENSION_BANNER=false`
}
