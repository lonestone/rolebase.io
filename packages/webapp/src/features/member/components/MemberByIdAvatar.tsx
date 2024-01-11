import { AvatarProps } from '@chakra-ui/react'
import React from 'react'
import useMember from '../hooks/useMember'
import MemberAvatar from './MemberAvatar'

interface Props extends AvatarProps {
  id: string
  circleId?: string
}

export default function MemberByIdAvatar({ id, ...props }: Props) {
  const member = useMember(id)

  return member ? <MemberAvatar member={member} {...props} /> : null
}
