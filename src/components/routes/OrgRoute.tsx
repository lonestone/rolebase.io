import Loading from '@atoms/Loading'
import TextError from '@atoms/TextError'
import { useOrgSubscription } from '@gql'
import CirclesPage from '@pages/CirclesPage'
import DecisionPage from '@pages/DecisionPage '
import LogsPage from '@pages/LogsPage'
import MeetingPage from '@pages/MeetingPage'
import MeetingRecurringPage from '@pages/MeetingRecurringPage'
import MembersPage from '@pages/MembersPage'
import Page404 from '@pages/Page404'
import TaskPage from '@pages/TaskPage'
import TasksPage from '@pages/TasksPage'
import ThreadPage from '@pages/ThreadPage'
import ThreadsPage from '@pages/ThreadsPage'
import { useStoreActions } from '@store/hooks'
import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

// Lazy pages
const MeetingsPage = lazy(() => import('@pages/MeetingsPage'))
const SubscriptionPage = lazy(() => import('@pages/SubscriptionPage'))

interface Props {
  orgId: string
}

export default function OrgRoute({ orgId }: Props) {
  // Subscribe to org structure
  const { data, error, loading } = useOrgSubscription({
    variables: { id: orgId },
  })

  const actions = useStoreActions((actions) => ({
    setCurrentId: actions.org.setCurrentId,
    setSubscriptionResult: actions.org.setSubscriptionResult,
  }))

  // Set current id in store, instantly from URL params
  useEffect(() => {
    actions.setCurrentId(orgId)
  }, [orgId])

  // Set current state in store
  useEffect(() => {
    actions.setSubscriptionResult({
      result: data?.org_by_pk ?? undefined,
      loading,
      error,
    })
  }, [data, error, loading])

  return (
    <Suspense fallback={<Loading active center />}>
      <Loading center active={loading} />
      {error && <TextError error={error} />}

      {data?.org_by_pk === null ? (
        <Page404 />
      ) : (
        <Routes>
          <Route index element={<CirclesPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="threads/:threadId" element={<ThreadPage />} />
          <Route path="threads" element={<ThreadsPage />} />
          <Route path="meetings/:meetingId" element={<MeetingPage />} />
          <Route
            path="meetings-recurring/:id"
            element={<MeetingRecurringPage />}
          />
          <Route path="subscription" element={<SubscriptionPage />} />
          <Route path="meetings" element={<MeetingsPage />} />
          <Route path="tasks/:taskId" element={<TaskPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="decisions/:decisionId" element={<DecisionPage />} />
          <Route path="logs" element={<LogsPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      )}
    </Suspense>
  )
}
