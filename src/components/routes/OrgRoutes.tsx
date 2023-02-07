import Loading from '@atoms/Loading'
import TextError from '@atoms/TextError'
import { useOrgSubscription } from '@gql'
import useOrg from '@hooks/useOrg'
import useSuperAdmin from '@hooks/useSuperAdmin'
import CirclesPage from '@pages/CirclesPage'
import DecisionPage from '@pages/DecisionPage '
import LogsPage from '@pages/LogsPage'
import MeetingPage from '@pages/MeetingPage'
import MeetingRecurringPage from '@pages/MeetingRecurringPage'
import MembersPage from '@pages/MembersPage'
import Page404 from '@pages/Page404'
import SubscriptionPage from '@pages/SubscriptionPage'
import TaskPage from '@pages/TaskPage'
import TasksPage from '@pages/TasksPage'
import ThreadPage from '@pages/ThreadPage'
import ThreadsPage from '@pages/ThreadsPage'
import { useStoreActions, useStoreState } from '@store/hooks'
import { UserLocalStorageKeys } from '@utils/localStorage'
import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

// Lazy pages
const MeetingsPage = lazy(() => import('@pages/MeetingsPage'))

interface Props {
  orgId: string
}

export default function OrgRoutes({ orgId }: Props) {
  const org = useOrg(orgId)
  const orgLoading = useStoreState(
    (state) => state.orgs.loading || !state.orgs.entries
  )

  // Set current org id
  const setCurrentId = useStoreActions((actions) => actions.orgs.setCurrentId)
  useEffect(() => {
    setCurrentId(orgId)
  }, [orgId])

  const actions = useStoreActions((actions) => ({
    setCircles: actions.circles.setSubscriptionResult,
    setRoles: actions.roles.setSubscriptionResult,
    setMembers: actions.members.setSubscriptionResult,
  }))

  // Subscribe to org structure
  const { data, error, loading } = useOrgSubscription({
    variables: { id: orgId },
  })

  useEffect(() => {
    actions.setCircles({
      entries: data?.org_by_pk?.circles,
      loading,
      error,
    })
    actions.setRoles({
      entries: data?.org_by_pk?.roles,
      loading,
      error,
    })
    actions.setMembers({
      entries: data?.org_by_pk?.members,
      loading,
      error,
    })
  }, [data, error, loading])

  // If org doesn't exist, redirect to root
  const navigate = useNavigate()
  const superAdmin = useSuperAdmin()
  useEffect(() => {
    if (!org && !orgLoading && !superAdmin) {
      localStorage.removeItem(UserLocalStorageKeys.OrgId)
      navigate('/')
    }
  }, [org, orgLoading])

  return (
    <Suspense fallback={<Loading active center />}>
      <Loading center active={loading} />
      {error && <TextError error={error} />}

      <Routes>
        <Route index element={<CirclesPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="threads/:threadId" element={<ThreadPage />} />
        <Route path="threads" element={<ThreadsPage />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="meetings/:meetingId" element={<MeetingPage />} />
        <Route
          path="meetings-recurring/:id"
          element={<MeetingRecurringPage />}
        />
        <Route path="meetings" element={<MeetingsPage />} />
        <Route path="tasks/:taskId" element={<TaskPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="decisions/:decisionId" element={<DecisionPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  )
}
