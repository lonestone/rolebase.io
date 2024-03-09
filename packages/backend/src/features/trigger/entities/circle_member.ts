import { CircleMemberFragment } from '../../../gql'
import { HasuraEvent } from '../../../utils/nhost'
import CircleParticipantsCache from '../../participants/CircleParticipantsCache'
import { IndexEntity } from './IndexEntity'

export class IndexCircleMember extends IndexEntity<CircleMemberFragment> {
  static table = 'public.circle_member'

  async applyEvent(event: HasuraEvent<CircleMemberFragment>) {
    const { data } = event.event
    const circleId = data.new?.circleId

    // Only if archived has changed
    if (data.new?.archived === data.old?.archived || !circleId) {
      return
    }

    // Update circles participants cache
    await CircleParticipantsCache.recomputeCircle(circleId)
  }
}
