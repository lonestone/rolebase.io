import {
  CircleFullFragment,
  MemberFragment,
  OrgFragment,
  OrgFullFragment,
  RoleFragment,
} from '@gql'
import { omit } from '@utils/omit'
import { action, Action } from 'easy-peasy'

interface OrgModel {
  currentId: string | undefined
  current: OrgFragment | undefined
  circles: CircleFullFragment[] | undefined
  roles: RoleFragment[] | undefined
  members: MemberFragment[] | undefined
  loading: boolean
  error: Error | undefined
  // Set Id instantly from URL params
  setCurrentId: Action<OrgModel, string | undefined>
  // Set current after loading
  setSubscriptionResult: Action<
    OrgModel,
    {
      result: OrgFullFragment | undefined
      loading: boolean
      error: Error | undefined
    }
  >
}

const extendedModel: OrgModel = {
  currentId: undefined,
  current: undefined,
  circles: undefined,
  roles: undefined,
  members: undefined,
  loading: false,
  error: undefined,

  setCurrentId: action((state, id) => {
    state.currentId = id
  }),

  setSubscriptionResult: action((state, { result, loading, error }) => {
    if (result) {
      state.current = omit(result, 'members', 'roles', 'circles')
      state.circles = result.circles
      state.roles = result.roles
      state.members = result.members
    }
    state.loading = loading
    state.error = error
  }),
}

export default extendedModel
