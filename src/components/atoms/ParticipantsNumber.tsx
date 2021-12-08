import { Avatar, Box, Flex, FlexProps } from '@chakra-ui/react'
import useParticipants from '@hooks/useParticipants'
import { MembersScope } from '@shared/member'
import React, { useMemo } from 'react'

interface Props extends FlexProps {
  circleId: string
  participantsScope: MembersScope
  participantsMembersIds?: string[]
}

export default function ParticipantsNumber({
  circleId,
  participantsScope,
  participantsMembersIds,
  ...flexProps
}: Props) {
  const participants = useParticipants(
    circleId,
    participantsScope,
    participantsMembersIds
  )
  const someParticipants = useMemo(
    () => participants.slice(0, 3).reverse(),
    [participants]
  )
  const avatarsWidth =
    participants.length && (someParticipants.length - 1) * 10 + 24

  return (
    <Flex
      p={1}
      fisplay="inline-flex"
      border="1px solid #ccc"
      borderRadius="full"
      position="relative"
      {...flexProps}
    >
      <Box width={`${avatarsWidth}px`}>
        {someParticipants.map(({ member }, i) => (
          <Avatar
            key={i}
            name={member.name}
            src={member.picture || undefined}
            size="xs"
            position="absolute"
            left={`${(someParticipants.length - 1 - i) * 10 + 4}px`}
          />
        ))}
      </Box>
      <Box px={2} fontWeight="bold">
        {participants.length}
      </Box>
    </Flex>
  )
}
