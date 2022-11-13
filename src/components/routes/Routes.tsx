import Loading from '@components/atoms/Loading'
import { useAuthenticationStatus } from '@nhost/react'
import React from 'react'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

export default function Routes() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  if (isLoading) return <Loading active center />
  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />
}
