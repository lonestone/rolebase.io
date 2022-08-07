import { getCollection } from '@api/helpers/getCollection'
import { getEntityMethods } from '@api/helpers/getEntityMethods'
import { subscribeQuery } from '@api/helpers/subscribeQuery'
import { Decision } from '@shared/model/decision'
import { Optional } from '@shared/model/types'
import {
  orderBy,
  query,
  QueryConstraint,
  Timestamp,
  where,
} from 'firebase/firestore'
import { memoize } from 'src/memoize'

export const collection = getCollection<Decision>('decisions')

const methods = getEntityMethods(collection, {
  createTransform: (
    decision: Optional<Decision, 'createdAt' | 'archived'>
  ) => ({
    createdAt: Timestamp.now(),
    archived: false,
    ...decision,
  }),
})
export const getDecision = methods.get
export const createDecision = methods.create
export const updateDecision = methods.update
export const subscribeDecision = methods.subscribe
export const deleteDecision = methods.delete

// Subscribe to decisions assigned to a member or a circle
export const subscribeDecisions = memoize(
  (orgId: string, memberId?: string, circleId?: string) => {
    const constraints: QueryConstraint[] = []
    if (memberId) {
      constraints.push(where('memberId', '==', memberId))
    }
    if (circleId) {
      constraints.push(where('circleId', '==', circleId))
    }
    return subscribeQuery(
      query(
        collection,
        where('orgId', '==', orgId),
        where('archived', '==', false),
        ...constraints,
        orderBy('createdAt', 'desc')
      )
    )
  }
)
