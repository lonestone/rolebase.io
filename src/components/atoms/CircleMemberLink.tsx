import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import useCircleMemberLink from './useCircleMemberLink'

interface Props extends Omit<LinkProps, 'to' | 'onClick'> {
  circleId?: string
  memberId?: string
}

export default function CircleMemberLink({
  circleId,
  memberId,
  ...linkProps
}: Props) {
  const link = useCircleMemberLink(circleId, memberId)
  return <Link {...link} {...linkProps} />
}
