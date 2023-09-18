import { CircleWithRoleFragment, MeetingFragment } from '@gql'
import slugify from 'slugify'

export default function generateVideoConfUrl(
  meeting: MeetingFragment,
  circle: CircleWithRoleFragment,
  displayName = ''
) {
  const roomName = `${circle.role.name} ${meeting.title} ${meeting.id}`
  return `https://meet.jit.si/${slugify(roomName, {
    strict: true,
  })}#userInfo.displayName="${encodeURIComponent(
    displayName
  )}"&interfaceConfig.SHOW_CHROME_EXTENSION_BANNER=false`
}
