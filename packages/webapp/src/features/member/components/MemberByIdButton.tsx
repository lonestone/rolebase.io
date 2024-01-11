import { ButtonProps } from '@chakra-ui/react'
import React from 'react'
import useMember from '../hooks/useMember'
import MemberButton from './MemberButton'

interface Props extends ButtonProps {
  id: string
}

export default function MemberByIdButton({ id, ...buttonProps }: Props) {
  const member = useMember(id)
  return member ? <MemberButton member={member} {...buttonProps} /> : null
}
