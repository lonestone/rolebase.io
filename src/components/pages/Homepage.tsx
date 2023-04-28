import Loading from '@atoms/Loading'
import AuthPage from '@pages/AuthPage'
import React, { useEffect } from 'react'
import settings from 'src/settings'

export default function Homepage() {
  // Redirect to website (prod only)
  useEffect(() => {
    if (!settings.isLocal) {
      window.location.href = settings.websiteUrl
    }
  }, [])

  return settings.isLocal ? <AuthPage /> : <Loading active center />
}
