import Loading from '@atoms/Loading'
import TextError from '@atoms/TextError'
import { useOrgBySlugSubscription, useOrgSubscription } from '@gql'
import CirclesPage from '@pages/CirclesPage'
import DashboardPage from '@pages/DashboardPage'
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
import React, { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

// Lazy pages
const MeetingsPage = lazy(() => import('@pages/MeetingsPage'))
const SubscriptionPage = lazy(() => import('@pages/SubscriptionPage'))
const CircleExportPage = lazy(() => import('@pages/CircleExportPage'))

type Params = {
  orgId: string
  slug: string
}

export default function OrgRoute() {
  const { orgId, slug } = useParams<Params>()

  // Subscribe to org structure
  // either by id or slug
  const {
    data: dataId,
    error: errorId,
    loading: loadingId,
  } = useOrgSubscription({
    skip: !orgId,
    variables: { id: orgId! },
  })
  const {
    data: dataSlug,
    error: errorSlug,
    loading: loadingSlug,
  } = useOrgBySlugSubscription({
    skip: !slug,
    variables: { slug: slug! },
  })

  const data = dataId?.org_by_pk ?? dataSlug?.org[0]
  const error = errorId ?? errorSlug
  const loading = loadingId || loadingSlug

  const actions = useStoreActions((actions) => ({
    setCurrentId: actions.org.setCurrentId,
    setSubscriptionResult: actions.org.setSubscriptionResult,
  }))

  // Set current id in store instantly from URL params
  useEffect(() => {
    if (!orgId) return
    actions.setCurrentId(orgId)
  }, [orgId])

  // Set current id in store when using a slug and org is loaded
  useEffect(() => {
    if (!slug && data?.id) return
    actions.setCurrentId(data?.id)
  }, [slug, data?.id])

  // Reset current id on unmount
  useEffect(() => {
    return () => actions.setCurrentId(undefined)
  }, [])

  // Set current state in store
  useEffect(() => {
    actions.setSubscriptionResult({
      result: data ?? undefined,
      loading,
      error,
    })
  }, [data, error, loading])

  return (
    <Suspense fallback={<Loading active center />}>
      <Loading center active={loading} />
      {error && <TextError error={error} />}

      {!data && !loading ? (
        <Page404 />
      ) : (
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="roles" element={<CirclesPage />} />
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
          <Route
            path="export-circle/:circleId"
            element={<CircleExportPage />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      )}
    </Suspense>
  )
}
