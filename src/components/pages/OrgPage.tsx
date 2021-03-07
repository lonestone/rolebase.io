import React, { useEffect } from 'react'
import { Route, Switch, useParams } from 'react-router-dom'
import Loading from '../common/Loading'
import TextErrors from '../common/TextErrors'
import { useStoreActions, useStoreState } from '../store/hooks'
import CirclesPage from './CirclesPage'
import MembersPage from './MembersPage'
import RolesPage from './RolesPage'

export default function OrgPage() {
  const { orgId } = useParams<{ orgId: string }>()

  const circlesError = useStoreState((state) => state.circles.error)
  const circlesLoading = useStoreState((state) => state.circles.loading)

  const membersError = useStoreState((state) => state.members.error)
  const membersLoading = useStoreState((state) => state.members.loading)

  const rolesError = useStoreState((state) => state.roles.error)
  const rolesLoading = useStoreState((state) => state.roles.loading)

  const actions = useStoreActions((actions) => ({
    setOrgId: actions.orgs.setCurrentId,
    subscribeCircles: actions.circles.subscribe,
    unsubscribeCircles: actions.circles.unsubscribe,
    subscribeMembers: actions.members.subscribe,
    unsubscribeMembers: actions.members.unsubscribe,
    subscribeRoles: actions.roles.subscribe,
    unsubscribeRoles: actions.roles.unsubscribe,
  }))

  useEffect(() => {
    if (orgId) {
      actions.setOrgId(orgId)
      actions.subscribeCircles({ orgId })
      actions.subscribeMembers({ orgId })
      actions.subscribeRoles({ orgId })
      return () => {
        actions.setOrgId(undefined)
        actions.unsubscribeCircles()
        actions.unsubscribeMembers()
        actions.unsubscribeRoles()
      }
    }
  }, [orgId])

  return (
    <>
      <Loading
        center
        active={membersLoading || circlesLoading || rolesLoading}
      />
      <TextErrors errors={[membersError, rolesError, circlesError]} />

      <Switch>
        <Route exact path="/orgs/:orgId">
          <CirclesPage />
        </Route>
        <Route path="/orgs/:orgId/members">
          <MembersPage />
        </Route>
        <Route path="/orgs/:orgId/roles">
          <RolesPage />
        </Route>
      </Switch>
    </>
  )
}
