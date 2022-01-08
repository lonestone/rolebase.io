import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import CirclesPage from '@components/pages/CirclesPage'
import MeetingPage from '@components/pages/MeetingPage'
import MeetingsPage from '@components/pages/MeetingsPage'
import MembersPage from '@components/pages/MembersPage'
import TaskPage from '@components/pages/TaskPage'
import TasksPage from '@components/pages/TasksPage'
import ThreadPage from '@components/pages/ThreadPage'
import ThreadsPage from '@components/pages/ThreadsPage'
import useOrg from '@hooks/useOrg'
import { useStoreActions, useStoreState } from '@store/hooks'
import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'

export default function OrgRoutes() {
  const { orgId } = useParams<{ orgId: string }>()
  const org = useOrg(orgId)
  const orgLoading = useStoreState(
    (state) => state.orgs.loading || !state.orgs.entries
  )

  const loading =
    useStoreState(
      (state) =>
        state.circles.loading || state.members.loading || state.roles.loading
    ) || orgLoading
  const circlesError = useStoreState((state) => state.circles.error)
  const membersError = useStoreState((state) => state.members.error)
  const rolesError = useStoreState((state) => state.roles.error)

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
      actions.subscribeCircles({ parentId: orgId })
      actions.subscribeMembers({ parentId: orgId })
      actions.subscribeRoles({ parentId: orgId })
      return () => {
        actions.setOrgId(undefined)
        actions.unsubscribeCircles()
        actions.unsubscribeMembers()
        actions.unsubscribeRoles()
      }
    }
  }, [orgId])

  if (!org && !orgLoading) {
    return <Redirect to="/" />
  }

  return (
    <>
      <Loading center active={loading} />
      <TextErrors errors={[membersError, rolesError, circlesError]} />

      <Switch>
        <Route exact path="/orgs/:orgId">
          <CirclesPage />
        </Route>
        <Route exact path="/orgs/:orgId/members">
          <MembersPage />
        </Route>
        <Route exact path="/orgs/:orgId/threads/:threadId">
          <ThreadPage />
        </Route>
        <Route exact path="/orgs/:orgId/threads">
          <ThreadsPage />
        </Route>
        <Route exact path="/orgs/:orgId/meetings/:meetingId">
          <MeetingPage />
        </Route>
        <Route exact path="/orgs/:orgId/meetings">
          <MeetingsPage />
        </Route>
        <Route exact path="/orgs/:orgId/tasks/:taskId">
          <TaskPage />
        </Route>
        <Route exact path="/orgs/:orgId/tasks">
          <TasksPage />
        </Route>
        <Route>
          <Redirect to={`/orgs/${orgId}`} />
        </Route>
      </Switch>
    </>
  )
}
