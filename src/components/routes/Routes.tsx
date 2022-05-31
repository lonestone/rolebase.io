import Loading from '@components/atoms/Loading'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useHistory } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

// Show auth loading only if not in some routes
const noLoadingRoutes = ['/login', '/signup']

export default function Routes() {
  const user = useStoreState((state) => state.auth.user)
  const loading = useStoreState((state) => state.auth.loading)
  const route = useHistory()

  return loading && !noLoadingRoutes.includes(route.location.pathname) ? (
    <Loading center active />
  ) : user ? (
    <PrivateRoutes />
  ) : (
    <PublicRoutes />
  )
}
