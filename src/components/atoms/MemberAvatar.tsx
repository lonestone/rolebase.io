import { Avatar, AvatarProps, Tooltip } from '@chakra-ui/react'
import { MemberSummaryFragment } from '@gql'
import CircleMemberLink from './CircleMemberLink'

interface Props extends AvatarProps {
  member: MemberSummaryFragment
  circleId?: string
}

export default function MemberAvatar({
  member,
  circleId,
  ...avatarProps
}: Props) {
  return member ? (
    <CircleMemberLink memberId={member.id} circleId={circleId}>
      <Tooltip label={member.name} placement="top" hasArrow>
        <Avatar
          name={member.name}
          src={member.picture || undefined}
          {...avatarProps}
        />
      </Tooltip>
    </CircleMemberLink>
  ) : null
}
