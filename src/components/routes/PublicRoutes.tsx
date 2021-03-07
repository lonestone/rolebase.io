import React from 'react'
import Loading from '../common/Loading'
import LoginPage from '../pages/LoginPage'
import { useStoreState } from '../store/hooks'

export default function PublicRoutes() {
  const loading = useStoreState((state) => state.auth.loading)
  return loading ? <Loading center active={loading} /> : <LoginPage />
}
