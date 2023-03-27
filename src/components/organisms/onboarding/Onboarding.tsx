import { CircleWithRoleFragment } from '@gql'
import useMemberPreferences from '@hooks/useMemberPreferences'
import { useUserData } from '@nhost/react'
import { useStoreState } from '@store/hooks'
import { add, isBefore } from 'date-fns'
import React, { useEffect, useState } from 'react'
import OnboardingCircleMembersModal from './OnboardingCircleMembersModal'
import OnboardingCirclesModal from './OnboardingCirclesModal'
import RateAppModal from './RateAppModal'

enum Steps {
  None,
  Circles,
  CircleMembers,
  Done,
}

const noop = () => {}

export default function Onboarding() {
  const user = useUserData()
  const { preferences } = useMemberPreferences()
  const circles = useStoreState((state) => state.org.circles)

  const [step, setStep] = useState(Steps.None)

  // Stack of newly created circles to populate with members
  const [nextCircles, setNextCircles] = useState<CircleWithRoleFragment[]>([])

  // Start onboarding if there is only one circle
  useEffect(() => {
    if (!circles) return
    if (step === Steps.None && circles.length === 1) {
      setStep(Steps.Circles)
    }
  }, [circles, step])

  const handleCirclesSubmit = async (circles: CircleWithRoleFragment[]) => {
    if (circles.length === 0) return
    setNextCircles(circles)
    setStep(Steps.CircleMembers)
  }

  const handleCircleMembersSubmit = () => {
    if (!circles) return
    if (nextCircles.length > 1) {
      // Go to next circle
      setNextCircles(nextCircles.slice(1))
    } else if (nextCircles.length === 1) {
      // That was the last circles, we finished adding members
      setNextCircles([])
      setStep(Steps.Done)
    }
  }

  switch (step) {
    case Steps.Circles:
      return (
        <OnboardingCirclesModal
          isOpen
          onSubmit={handleCirclesSubmit}
          onClose={noop}
        />
      )
    case Steps.CircleMembers:
      if (!nextCircles[0]) return null
      return (
        <OnboardingCircleMembersModal
          key={nextCircles[0].id}
          isOpen
          circle={nextCircles[0]}
          onSubmit={handleCircleMembersSubmit}
          onClose={noop}
        />
      )
    default:
      {
        // Show modal to ask user to rate the app
        // if user signed up more than 7 days ago
        const showRateModal =
          user &&
          preferences &&
          !preferences.ratedApp &&
          isBefore(new Date(user.createdAt), add(new Date(), { days: -7 }))
        if (showRateModal) {
          return <RateAppModal />
        }
      }
      return null
  }
}
