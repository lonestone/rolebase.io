import { Link, LinkProps } from '@chakra-ui/react'
import React from 'react'
import CircleMemberLink from '../../circle/components/CircleMemberLink'

interface Props extends LinkProps {
  id: string
  name: string
}

export default function MemberLink({ id, name, ...linkProps }: Props) {
  return (
    <Link as={CircleMemberLink} memberId={id} {...linkProps}>
      {name}
    </Link>
  )
}
