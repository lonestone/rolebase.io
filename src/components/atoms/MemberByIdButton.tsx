import { ButtonProps } from '@chakra-ui/react'
import useMember from '@hooks/useMember'
import CircleMemberLink from './CircleMemberLink'
import MemberButton from './MemberButton'

interface Props extends ButtonProps {
  id: string
}

export default function MemberByIdButton({ id, ...buttonProps }: Props) {
  const member = useMember(id)
  return member ? (
    <CircleMemberLink memberId={id} tabIndex={-1}>
      <MemberButton member={member} {...buttonProps} />
    </CircleMemberLink>
  ) : null
}
