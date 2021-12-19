import { FormControl, FormLabel, VStack } from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import Panel from '@components/atoms/Panel'
import VacantRoles from '@components/molecules/VacantRoles'
import getCircleChildrenAndRoles from '@shared/getCircleChildren'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'

export default function CirclesDefaultPanel() {
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)

  // Get direct circles children and their roles
  const superCircle = useMemo(
    () =>
      circles && roles && getCircleChildrenAndRoles(circles, roles, null)[0],
    [circles, roles]
  )

  return (
    <Panel w="auto">
      <VStack spacing={5} align="start">
        <FormControl>
          <FormLabel>Super-Cercle :</FormLabel>
          {superCircle && <CircleButton circle={superCircle} />}
        </FormControl>

        <VacantRoles />
      </VStack>
    </Panel>
  )
}
