import { Box, ModalCloseButton } from '@chakra-ui/react'
import { Member_Scope_Enum } from '@gql'
import useCircle from '@hooks/useCircle'
import useParticipants from '@hooks/useParticipants'
import CircleAndParentsLinks from '@molecules/circle/CircleAndParentsLinks'
import CircleRoleFormControl from '@molecules/circle/CircleRoleFormControl'
import React from 'react'

interface Props {
  id: string
}

export default function CircleCard({ id }: Props) {
  const circle = useCircle(id)

  const participants = useParticipants(
    id,
    Member_Scope_Enum.CircleLeaders,
    circle?.members.map((member) => member.id)
  )

  if (!circle) return null

  return (
    <Box p={5}>
      <ModalCloseButton />
      <CircleAndParentsLinks circle={circle} size="md" mb={5} />
      <CircleRoleFormControl circle={circle} participants={participants} />
    </Box>
  )
}
