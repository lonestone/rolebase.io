import { subscribeAllMeetings } from '@api/entities/meetings'
import useSubscription from '@hooks/useSubscription'
import { EntityFilters } from '@shared/types'
import { useStoreState } from '@store/hooks'
import useFilterEntities from './useFilterEntities'

export default function useMeetingsList(
  filter: EntityFilters,
  ended: boolean,
  circleId?: string
) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  // Subscribe to meetings
  const { data, error, loading } = useSubscription(
    orgId ? subscribeAllMeetings(orgId, ended) : undefined
  )

  // Filter meetings
  const meetings = useFilterEntities(filter, data, circleId)

  return { meetings, error, loading }
}
