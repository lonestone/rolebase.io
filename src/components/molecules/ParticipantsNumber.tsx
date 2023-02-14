import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuList,
  Portal,
} from '@chakra-ui/react'
import { ParticipantMember } from '@shared/model/member'
import React, { useMemo } from 'react'
import CircleMemberLink from '../atoms/CircleMemberLink'
import MemberMenuItem from '../atoms/MemberMenuItem'

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

  // Number of avatar slots displayed
  const n = someParticipants.length

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
        <Box
          h={6}
          w={n ? 6 : 0}
          mr={`calc((${n} - 1) * var(--chakra-sizes-6) / 2.4)`}
          position="relative"
        >
          {someParticipants.map(({ member }, i) => (
            <Avatar
              key={i}
              name={member.name}
              src={member.picture || undefined}
              size="xs"
              position="absolute"
              top={0}
              left={`calc(${n - i - 1} * var(--chakra-sizes-6) / 2.4)`}
            />
          ))}
        </Box>
      </MenuButton>

      <Portal>
        <MenuList shadow="lg" zIndex={2000} maxH="390px" overflow="auto">
          {participants.map(({ member, circlesIds }) => (
            <CircleMemberLink
              key={member.id}
              memberId={member.id}
              circleId={circlesIds[0]}
            >
              <MemberMenuItem member={member} circlesIds={circlesIds} />
            </CircleMemberLink>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  )
}
