import React, { useEffect } from 'react'
import { auth } from '../../api/firebase'
import { useStoreActions, useStoreState } from '../store/hooks'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

export default function Routes() {
  const user = useStoreState((state) => state.auth.user)
  const setUser = useStoreActions((actions) => actions.auth.setUser)
  const signout = useStoreActions((actions) => actions.auth.signout)

  // Update store when auth state changes
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        signout()
      }
    })
  }, [])

  return user ? <PrivateRoutes /> : <PublicRoutes />
}
