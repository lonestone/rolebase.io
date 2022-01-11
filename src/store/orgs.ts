import { subscribeOrgs } from '@api/entities/orgs'
import { OrgEntry } from '@shared/org'
import { action, Action } from 'easy-peasy'
import { createModel, GenericModel } from './generic'

const model = createModel(subscribeOrgs)

interface OrgsModel extends GenericModel<OrgEntry, string[]> {
  currentId: string | undefined
  setCurrentId: Action<OrgsModel, string | undefined>
}

const extendedModel: OrgsModel = {
  ...model,
  currentId: undefined,
  setCurrentId: action((state, id) => {
    state.currentId = id
  }),
}

export default extendedModel
