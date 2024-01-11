import useCircleMemberLink from '@/participants/hooks/useCircleMemberLink'
import { Avatar, LinkOverlay, LinkOverlayProps } from '@chakra-ui/react'
import { MemberFragment } from '@gql'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkOverlayProps {
  member: MemberFragment
}

export default function MemberLinkOverlay({
  member,
  ...linkOverlayProps
}: Props) {
  const link = useCircleMemberLink(undefined, member.id)

  return (
    <>
      <LinkOverlay
        as={ReachLink}
        flex={1}
        display="flex"
        alignItems="center"
        {...link}
        {...linkOverlayProps}
      >
        <Avatar
          name={member.name}
          src={member.picture || undefined}
          size={'sm'}
          mr={3}
        />
        {member.name}
      </LinkOverlay>
    </>
  )
}
