import {
  CloseButton,
  Heading,
  HStack,
  Spacer,
  Stack,
  StackItem,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { CircleEntry } from '../../api/entities/circles'
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

      <Stack direction="column">
        {vacantCircles?.map((circle) => (
          <CircleAndParentsButton id={circle.id} />
        ))}
      </Stack>
    </Panel>
  )
}
