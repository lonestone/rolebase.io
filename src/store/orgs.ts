import { OrgEntry } from '@shared/model/org'
import { action, Action } from 'easy-peasy'
import { createModel, GenericModel } from './generic'

const model = createModel<OrgEntry>()

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
