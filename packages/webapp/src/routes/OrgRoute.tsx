import CirclesPage from '@/circle/pages/CirclesPage'
import Loading from '@/common/atoms/Loading'
import TextError from '@/common/atoms/TextError'
import Page404 from '@/common/pages/Page404'
import DashboardPage from '@/dashboard/pages/DashboardPage'
import DecisionPage from '@/decision/pages/DecisionPage '
import LogsPage from '@/log/pages/LogsPage'
import MeetingPage from '@/meeting/pages/MeetingPage'
import MeetingRecurringPage from '@/meeting/pages/MeetingRecurringPage'
import { useSubscribeCurrentMeeting } from '@/member/hooks/useSubscribeCurrentMeeting'
import MembersPage from '@/member/pages/MembersPage'
import TaskPage from '@/task/pages/TaskPage'
import TasksPage from '@/task/pages/TasksPage'
import ThreadPage from '@/thread/pages/ThreadPage'
import ThreadsPage from '@/thread/pages/ThreadsPage'
import { useOrgBySlugSubscription, useOrgSubscription } from '@gql'
import { useStoreActions } from '@store/hooks'
import React, { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'

// Lazy pages
const MeetingsPage = lazy(() => import('@/meeting/pages/MeetingsPage'))
const SubscriptionPage = lazy(
  () => import('@/orgSubscription/pages/SubscriptionPage')
)
const CircleExportPage = lazy(() => import('@/circle/pages/CircleExportPage'))

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
    if (!slug && !data?.id) return
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

  // Update current meeting in store
  useSubscribeCurrentMeeting()

  return (
    <Suspense fallback={<Loading active center />}>
      <Loading center active={loading} />
      {error && <TextError error={error} />}

      {!data && !loading ? (
        <Page404 />
      ) : (
        <Routes>
          <Route index element={<Navigate to="news" replace />} />
          <Route path="roles" element={<CirclesPage />} />
          <Route path="news" element={<DashboardPage />} />
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
          <Route path="export-circle" element={<CircleExportPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      )}
    </Suspense>
  )
}
