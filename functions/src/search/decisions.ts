import { Decision } from '@shared/model/decision'
import { SearchTypes } from '@shared/model/search'
import { collections } from '../firebase'
import { getIndexEntities } from '../helpers/getIndexEntities'
import { getIndexEntity } from '../helpers/getIndexEntity'
import { getUpdateSearchHandler } from '../helpers/getUpdateSearchHandler'

const indexDecision = getIndexEntity<Decision>(SearchTypes.Decision, {
  getTitle: (decision) => decision.title,
})

export const indexDecisions = getIndexEntities(
  collections.decisions,
  indexDecision
)

export const onDecisionUpdateSearch = getUpdateSearchHandler(
  'decisions/{id}',
  indexDecision
)
