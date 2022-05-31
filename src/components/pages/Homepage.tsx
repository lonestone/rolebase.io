import LoginPage from '@components/pages/LoginPage'
import React, { useEffect } from 'react'
import settings from 'src/settings'

export default function Homepage() {
  // Redirect to website (prod only)
  useEffect(() => {
    if (location.hostname !== 'localhost') {
      window.location.href = settings.websiteUrl
    }
  }, [])

  return <LoginPage />
}
