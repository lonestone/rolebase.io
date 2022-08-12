import Loading from '@components/atoms/Loading'
import LoginPage from '@components/pages/LoginPage'
import React, { useEffect } from 'react'
import settings from 'src/settings'

const isProd = location.hostname !== 'localhost'

export default function Homepage() {
  // Redirect to website (prod only)
  useEffect(() => {
    if (isProd) {
      window.location.href = settings.websiteUrl
    }
  }, [])

  return isProd ? <Loading active center /> : <LoginPage />
}
