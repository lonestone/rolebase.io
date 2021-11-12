import { useStoreState } from '@store/hooks'
import React from 'react'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

export default function Routes() {
  const user = useStoreState((state) => state.auth.user)
  return user ? <PrivateRoutes /> : <PublicRoutes />
}
