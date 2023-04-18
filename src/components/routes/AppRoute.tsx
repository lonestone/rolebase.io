import Loading from '@atoms/Loading'
import { useAuthenticationStatus } from '@nhost/react'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export default function AppRoute() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  if (isLoading) return <Loading active center />
  return isAuthenticated ? <PrivateRoute /> : <PublicRoute />
}
