import { OrgFragment } from '@gql'
import { action, Action } from 'easy-peasy'
import { createModel, GenericModel } from './generic'

const model = createModel<OrgFragment>()

interface OrgsModel extends GenericModel<OrgFragment> {
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
