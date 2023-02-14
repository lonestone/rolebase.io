import Loading from '@atoms/Loading'
import LoginPage from '@pages/LoginPage'
import React, { useEffect } from 'react'
import settings from 'src/settings'

export default function Homepage() {
  // Redirect to website (prod only)
  useEffect(() => {
    if (!settings.isLocal) {
      window.location.href = settings.websiteUrl
    }
  }, [])

  return settings.isLocal ? <LoginPage /> : <Loading active center />
}
