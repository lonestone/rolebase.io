import { MeetingFragment } from '../gql'
import { VideoConfTypes } from '../model/meeting'
import generateJitsiUrl from './generateJitsiUrl'

export default function getMeetingVideoConfUrl(
  meeting?: MeetingFragment,
  roleName?: string,
  displayName = ''
): string | undefined {
  if (!meeting?.videoConf) return
  if (meeting.videoConf.type === VideoConfTypes.Jitsi && roleName) {
    return generateJitsiUrl(meeting, roleName, displayName)
  }
  if (meeting.videoConf.type === VideoConfTypes.Url) {
    return meeting.videoConf.url
  }
}
