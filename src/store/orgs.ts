import { OrgFragment } from '@gql'
import { action, Action } from 'easy-peasy'
import { createModel, GenericModel } from './generic'

const model = createModel<OrgFragment>()

interface OrgsModel extends GenericModel<OrgFragment> {
  currentId: string | undefined
  current: OrgFragment | undefined
  // Set Id instantly from URL params
  setCurrentId: Action<OrgsModel, string | undefined>
  // Set current after loading
  setCurrent: Action<OrgsModel, OrgFragment | undefined>
}

const extendedModel: OrgsModel = {
  ...model,
  current: undefined,
  currentId: undefined,
  setCurrent: action((state, org) => {
    state.current = org
  }),
  setCurrentId: action((state, id) => {
    state.currentId = id
  }),
}

export default extendedModel
