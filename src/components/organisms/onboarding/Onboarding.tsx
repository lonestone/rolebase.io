import useUserMetadata from '@hooks/useUserMetadata'
import { useUserData } from '@nhost/react'
import { add, isBefore } from 'date-fns'
import React, { useEffect } from 'react'
import settings from 'src/settings'
import userflow from 'userflow.js'
import RateAppModal from './RateAppModal'

export default function Onboarding() {
  const user = useUserData()
  const { metadata } = useUserMetadata()

  // Product tour (Userflow)
  useEffect(() => {
    if (!user) return

    // Start Userflow and identifiy user
    userflow.init(settings.userflow.token)
    userflow.identify(user.id, {
      name: user.displayName,
      email: user.email,
      signed_up_at: user.createdAt,
    })

    // Reset Userflow on unmount
    return () => userflow.reset()
  }, [])

  // Show modal to ask user to rate the app
  // if user signed up more than 7 days ago
  const showRateModal =
    user &&
    metadata &&
    !metadata.ratedApp &&
    isBefore(new Date(user.createdAt), add(new Date(), { days: -7 }))

  return showRateModal ? <RateAppModal /> : null
}
