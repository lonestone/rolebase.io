import Loading from '@atoms/Loading'
import { useAuthenticationStatus } from '@nhost/react'
import React from 'react'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import useSavedUserLocale from '@hooks/useSavedUserLocale'

export default function AppRoute() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  useSavedUserLocale(isAuthenticated)

  if (isLoading) return <Loading active center />
  return isAuthenticated ? <PrivateRoute /> : <PublicRoute />
}
