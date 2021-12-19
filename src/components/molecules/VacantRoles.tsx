import { FormControl, FormLabel, Stack } from '@chakra-ui/react'
import CircleAndParentsButton from '@components/atoms/CircleAndParentsButton'
import { CircleEntry } from '@shared/circle'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'

export default function VacantRoles() {
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)

  // Filter roles
  const vacantCircles: CircleEntry[] = useMemo(() => {
    if (!circles || !roles) return []
    return (
      circles
        // Keep empty circles
        ?.filter(
          (c) =>
            c.members.length === 0 &&
            !circles.some((c2) => c2.parentId === c.id)
        )
    )
  }, [circles, roles])

  if (!vacantCircles?.length) return null

  return (
    <FormControl>
      <FormLabel>Rôles vacants</FormLabel>
      <Stack>
        {vacantCircles?.map((circle) => (
          <CircleAndParentsButton key={circle.id} id={circle.id} />
        ))}
      </Stack>
    </FormControl>
  )
}
