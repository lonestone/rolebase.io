import { MeetingStepFragment } from '../../../gql'
import { HasuraEvent } from '../../../utils/nhost'
import { IndexEntity } from './IndexEntity'
import { IndexMeeting } from './meeting'

export class IndexMeetingStep extends IndexEntity<MeetingStepFragment> {
  static table = 'public.meeting_step'

  async applyEvent(event: HasuraEvent<MeetingStepFragment>) {
    const { data } = event.event
    const meetingId = data.new?.meetingId

    // Have notes changed?
    if (meetingId && data.new?.notes !== data.old?.notes) {
      const searchDoc = await new IndexMeeting().getById(meetingId)
      if (!searchDoc) return
      // Update meeting
      await this.index.saveObject(searchDoc).catch(console.error)
    }
  }
}
