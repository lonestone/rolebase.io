import { CircleWithRoleFragment } from '@gql'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useState } from 'react'
import OnboardingCircleMembersModal from './OnboardingCircleMembersModal'
import OnboardingCirclesModal from './OnboardingCirclesModal'

enum Steps {
  None,
  Circles,
  CircleMembers,
  Done,
}

const noop = () => {}

export default function Onboarding() {
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
      return null
  }
}
