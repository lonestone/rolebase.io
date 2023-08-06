import Loading from '@atoms/Loading'
import AuthPage from '@pages/AuthPage'
import React, { useEffect } from 'react'
import settings, { isLocal, isStaging } from 'src/settings'

export default function Homepage() {
  // Redirect to website (prod only)
  useEffect(() => {
    if (!isLocal && !isStaging) {
      window.location.href = settings.websiteUrl
    }
  }, [])

  return isLocal ? <AuthPage /> : <Loading active center />
}
