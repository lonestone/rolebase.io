import slugify from 'slugify'
import { CircleWithRoleEntry } from '../model/circle'
import { MeetingEntry } from '../model/meeting'
import { MemberEntry } from '../model/member'

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