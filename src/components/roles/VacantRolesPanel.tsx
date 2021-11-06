import {
  Box,
  CloseButton,
  Heading,
  HStack,
  Spacer,
  Stack,
  StackItem,
} from '@chakra-ui/react'
import { CircleEntry } from '@shared/circle'
import React, { useMemo } from 'react'
import CircleAndParentsButton from '../common/CircleAndParentsButton'
import Panel from '../common/Panel'
import { useStoreState } from '../store/hooks'

interface Props {
  onClose(): void
}

export default function VacantRolesPanel({ onClose }: Props) {
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

  return (
    <Panel>
      <Heading size="md" mb={5}>
        <HStack spacing={5}>
          <StackItem>Rôles vacants</StackItem>

          <Spacer />
          <CloseButton onClick={onClose} />
        </HStack>
      </Heading>

      {!vacantCircles?.length ? (
        <i>Aucun rôle vacant</i>
      ) : (
        <Stack direction="column">
          {vacantCircles?.map((circle) => (
            <CircleAndParentsButton key={circle.id} id={circle.id} />
          ))}
        </Stack>
      )}
    </Panel>
  )
}
