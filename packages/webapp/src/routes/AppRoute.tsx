import Loading from '@/common/atoms/Loading'
import { useAuth } from '@/user/hooks/useAuth'
import React from 'react'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export default function AppRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <Loading active center />
  return isAuthenticated ? <PrivateRoute /> : <PublicRoute />
}
