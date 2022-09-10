import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import CirclesPage from '@components/pages/CirclesPage'
import DecisionPage from '@components/pages/DecisionPage '
import LogsPage from '@components/pages/LogsPage'
import MeetingPage from '@components/pages/MeetingPage'
import MembersPage from '@components/pages/MembersPage'
import Page404 from '@components/pages/Page404'
import TaskPage from '@components/pages/TaskPage'
import TasksPage from '@components/pages/TasksPage'
import ThreadPage from '@components/pages/ThreadPage'
import ThreadsPage from '@components/pages/ThreadsPage'
import useOrg from '@hooks/useOrg'
import useSuperAdmin from '@hooks/useSuperAdmin'
import { useStoreActions, useStoreState } from '@store/hooks'
import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import { UserLocalStorageKeys } from 'src/utils'

// Lazy pages
const MeetingsPage = lazy(() => import('@components/pages/MeetingsPage'))

interface Props {
  orgId: string
}

export default function OrgRoutes({ orgId }: Props) {
  const { path } = useRouteMatch()
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

  // Subscribe to circles, members and roles
  useEffect(() => {
    actions.setOrgId(orgId)
    actions.subscribeCircles(orgId)
    actions.subscribeMembers(orgId)
    actions.subscribeRoles(orgId)
    return () => {
      actions.setOrgId(undefined)
      actions.unsubscribeCircles()
      actions.unsubscribeMembers()
      actions.unsubscribeRoles()
    }
  }, [orgId])

  // If org doesn't exist, redirect to root
  const history = useHistory()
  const superAdmin = useSuperAdmin()
  useEffect(() => {
    if (!org && !orgLoading && !superAdmin) {
      localStorage.removeItem(UserLocalStorageKeys.OrgId)
      history.replace('/')
    }
  }, [org, orgLoading])

  return (
    <Suspense fallback={<Loading active center />}>
      <Loading center active={loading} />
      <TextErrors errors={[membersError, rolesError, circlesError]} />

      <Switch key={orgId}>
        <Route exact path={path}>
          <CirclesPage />
        </Route>
        <Route exact path={`${path}/members`}>
          <MembersPage />
        </Route>
        <Route exact path={`${path}/threads/:threadId`}>
          <ThreadPage />
        </Route>
        <Route exact path={`${path}/threads`}>
          <ThreadsPage />
        </Route>
        <Route exact path={`${path}/meetings/:meetingId`}>
          <MeetingPage />
        </Route>
        <Route exact path={`${path}/meetings`}>
          <MeetingsPage />
        </Route>
        <Route exact path={`${path}/tasks/:taskId`}>
          <TaskPage />
        </Route>
        <Route exact path={`${path}/tasks`}>
          <TasksPage />
        </Route>
        <Route exact path={`${path}/decisions/:decisionId`}>
          <DecisionPage />
        </Route>
        <Route exact path={`${path}/logs`}>
          <LogsPage />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </Suspense>
  )
}
