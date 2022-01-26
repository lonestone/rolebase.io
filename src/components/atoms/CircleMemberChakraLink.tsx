import { Link, LinkProps } from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import useCircleMemberLink from './useCircleMemberLink'

interface Props extends Omit<LinkProps, 'to' | 'onClick'> {
  circleId?: string
  memberId?: string
}

export default function CircleMemberChakraLink({
  circleId,
  memberId,
  ...linkProps
}: Props) {
  const link = useCircleMemberLink(circleId, memberId)
  return <Link as={ReachLink} {...link} {...linkProps} />
}
