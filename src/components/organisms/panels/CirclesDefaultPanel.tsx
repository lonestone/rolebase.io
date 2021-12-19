import { Box, FormControl, FormLabel, VStack } from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import LinkButton from '@components/atoms/LinkButton'
import Panel from '@components/atoms/Panel'
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
        <Box>
          <LinkButton to="?baseRoles">Rôles de base</LinkButton>
          <LinkButton to="?vacantRoles" ml={2}>
            Rôles vacants
          </LinkButton>
        </Box>

        <FormControl>
          <FormLabel>Super-Cercle :</FormLabel>
          {superCircle && <CircleButton circle={superCircle} />}
        </FormControl>
      </VStack>
    </Panel>
  )
}
