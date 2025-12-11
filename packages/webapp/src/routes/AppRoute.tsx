import Loading from '@/common/atoms/Loading'
import { useAuth } from '@/user/hooks/useAuth'
import UserNamePage from '@/user/pages/UserNamePage'
import React from 'react'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export default function AppRoute() {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) return <Loading active center />

  // Show UserNamePage if user's displayName equals their email
  if (isAuthenticated && user?.displayName === user?.email) {
    return <UserNamePage />
  }

  return isAuthenticated ? <PrivateRoute /> : <PublicRoute />
}
