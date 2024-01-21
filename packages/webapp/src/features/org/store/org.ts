import {
  CircleFullFragment,
  MemberFragment,
  OrgFragment,
  OrgFullLightFragment,
  RoleSummaryFragment,
} from '@gql'
import { fixCirclesHue } from '@shared/helpers/fixCirclesHue'
import { fixLostCircles } from '@shared/helpers/fixLostCircles'
import { truthy } from '@shared/helpers/truthy'
import { omit } from '@utils/omit'
import { Action, action } from 'easy-peasy'

interface OrgModel {
  currentId: string | undefined
  current: OrgFragment | undefined
  circles: CircleFullFragment[] | undefined
  baseRoles: RoleSummaryFragment[] | undefined
  members: MemberFragment[] | undefined
  loading: boolean
  error: Error | undefined
  // Set Id instantly from URL params
  setCurrentId: Action<OrgModel, string | undefined>
  // Set current after loading
  setSubscriptionResult: Action<
    OrgModel,
    {
      result: OrgFullLightFragment | undefined
      loading: boolean
      error: Error | undefined
    }
  >
}

const model: OrgModel = {
  currentId: undefined,
  current: undefined,
  circles: undefined,
  baseRoles: undefined,
  members: undefined,
  loading: false,
  error: undefined,

  setCurrentId: action((state, id) => {
    if (state.currentId !== id) {
      state.currentId = id
      state.circles = undefined
      state.baseRoles = undefined
      state.members = undefined
    }
  }),

  setSubscriptionResult: action((state, { result, loading, error }) => {
    if (result) {
      state.current = omit(result, 'members', 'roles', 'circles')

      // Reconstruct and fix CircleFullFragments
      state.circles = fixLostCircles(
        fixCirclesHue(
          result.circles
            .map((circle) => {
              const role = result.roles.find(
                (role) => role.id === circle.roleId
              )
              const members = circle.members
                .map((circleMember) => {
                  const member = result.members.find(
                    (member) => member.id === circleMember.memberId
                  )
                  if (!member) return
                  return {
                    ...circleMember,
                    member,
                  }
                })
                .filter(truthy)

              if (!role) return
              return {
                ...circle,
                role,
                members,
              }
            })
            .filter(truthy)
        )
      )

      // Get and sort base roles
      state.baseRoles = result.roles
        .filter((role) => role.base)
        .sort((a, b) => a.name.localeCompare(b.name))

      // Get and sort members
      state.members = [...result.members].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    }
    state.loading = loading
    state.error = error
  }),
}

export default model
