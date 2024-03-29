import { CircleLinkFragment } from '../../../gql'
import { HasuraEvent } from '../../../utils/nhost'
import CircleParticipantsCache from '../../participants/CircleParticipantsCache'
import { IndexEntity } from './IndexEntity'

export class IndexCircleLink extends IndexEntity<CircleLinkFragment> {
  static table = 'public.circle_link'

  async applyEvent(event: HasuraEvent<CircleLinkFragment>) {
    const { data } = event.event
    const circleId = data.new?.circleId || data.old?.circleId
    if (!circleId) return

    // Update circles participants cache
    await CircleParticipantsCache.recomputeCircle(circleId)
  }
}
