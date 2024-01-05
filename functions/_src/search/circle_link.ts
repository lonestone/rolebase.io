import { CircleLinkFragment } from '@gql'
import CircleParticipantsCache from '@utils/CircleParticipantsCache'
import { HasuraEvent } from '@utils/nhost'
import { IndexEntity } from './IndexEntity'

export class IndexCircleLink extends IndexEntity<CircleLinkFragment> {
  static table = 'public.circle_link'

  async applyEvent(event: HasuraEvent<CircleLinkFragment>) {
    const { data } = event.event
    const circleId = data.new?.circleId || data.old?.circleId
    if (!circleId) return

    // Update circles participants cache
    CircleParticipantsCache.recomputeCircle(circleId)
  }
}
