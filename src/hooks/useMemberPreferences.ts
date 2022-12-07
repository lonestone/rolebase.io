import { MemberPreferences } from '@shared/model/member'
import { useCallback, useEffect, useState } from 'react'
import { useUpdateMemberMutation } from 'src/graphql.generated'
import useCurrentMember from './useCurrentMember'

// Return current member preferences and a function to set a preference
export default function useMemberPreferences() {
  const currentMember = useCurrentMember()
  const [updateMember] = useUpdateMemberMutation()
  const preferences = currentMember?.preferences
  const [cachedPreferences, setCachedPreferences] = useState(preferences)

  useEffect(() => {
    if (!preferences) return
    setCachedPreferences(preferences)
  }, [preferences])

  // Set preference value
  const setPreference = useCallback(
    async <Key extends keyof MemberPreferences>(
      key: Key,
      value: MemberPreferences[Key]
    ) => {
      if (!currentMember) return

      // Update local state
      setCachedPreferences((prev) => ({
        ...prev,
        [key]: value,
      }))

      // Update remote state
      updateMember({
        variables: {
          id: currentMember.id,
          values: {
            preferences: {
              [key]: value,
            },
          },
        },
      })
    },
    [currentMember]
  )

  return {
    preferences: cachedPreferences,
    setPreference,
  }
}
