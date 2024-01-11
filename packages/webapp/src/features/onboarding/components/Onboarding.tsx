import useUserMetadata from '@/user/hooks/useUserMetadata'
import { useUserData } from '@nhost/react'
import { add, isBefore } from 'date-fns'
import React from 'react'
import RateAppModal from './RateAppModal'

export default function Onboarding() {
  const user = useUserData()
  const { metadata } = useUserMetadata()

  // Show modal to ask user to rate the app
  // if user signed up more than 7 days ago
  const showRateModal =
    user &&
    metadata &&
    !metadata.ratedApp &&
    isBefore(new Date(user.createdAt), add(new Date(), { days: -7 }))

  return showRateModal ? <RateAppModal /> : null
}
