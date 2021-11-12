import { OrgEntry } from '@shared/org'
import { action, Action } from 'easy-peasy'
import { subscribeOrgs } from '../api/entities/orgs'
import { createModel, GenericModel } from './generic'

const model = createModel<OrgEntry>(subscribeOrgs)

interface OrgsModel extends GenericModel<OrgEntry> {
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
