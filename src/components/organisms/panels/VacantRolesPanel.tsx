import {
  CloseButton,
  Heading,
  HStack,
  Spacer,
  Stack,
  StackItem,
} from '@chakra-ui/react'
import CircleAndParentsButton from '@components/atoms/CircleAndParentsButton'
import Panel from '@components/atoms/Panel'
import { CircleEntry } from '@shared/circle'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'

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
        <Stack>
          {vacantCircles?.map((circle) => (
            <CircleAndParentsButton key={circle.id} id={circle.id} />
          ))}
        </Stack>
      )}
    </Panel>
  )
}
