import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuList,
} from '@chakra-ui/react'
import { ParticipantMember } from '@hooks/useParticipants'
import React, { useMemo } from 'react'
import MemberMenuItem from './MemberMenuItem'

interface Props extends MenuButtonProps {
  participants: ParticipantMember[]
}

export default function ParticipantsNumber({
  participants,
  ...buttonProps
}: Props) {
  const someParticipants = useMemo(
    () => participants.slice(0, 3).reverse(),
    [participants]
  )
  const avatarsWidth =
    participants.length && (someParticipants.length - 1) * 10 + 24

  return (
    <Menu isLazy autoSelect={false}>
      <MenuButton
        as={Button}
        p={1}
        borderRadius="full"
        size="sm"
        rightIcon={<Box mr={2}>{participants.length}</Box>}
        disabled={participants.length === 0}
        {...buttonProps}
      >
        <Box h="24px" w={`${avatarsWidth}px`} position="relative">
          {someParticipants.map(({ member }, i) => (
            <Avatar
              key={i}
              name={member.name}
              src={member.picture || undefined}
              size="xs"
              position="absolute"
              top={0}
              left={`${(someParticipants.length - 1 - i) * 10}px`}
            />
          ))}
        </Box>
      </MenuButton>
      <MenuList shadow="lg">
        {participants.map(({ member, circlesIds }, i) => (
          <MemberMenuItem
            key={member.id}
            member={member}
            circlesIds={circlesIds}
          />
        ))}
      </MenuList>
    </Menu>
  )
}
