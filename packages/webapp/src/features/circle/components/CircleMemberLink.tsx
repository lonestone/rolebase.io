import useCircleMemberLink from '@/participants/hooks/useCircleMemberLink'
import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface Props extends Omit<LinkProps, 'to' | 'onClick'> {
  circleId?: string
  memberId?: string
  parentId?: string
}

export default function CircleMemberLink({
  circleId,
  memberId,
  parentId,
  ...linkProps
}: Props) {
  const link = useCircleMemberLink(circleId, memberId, parentId)
  return <Link {...link} {...linkProps} />
}
