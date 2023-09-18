import { Avatar, AvatarProps } from '@chakra-ui/react'
import { SearchTypes } from '@shared/model/search'
import React from 'react'
import {
  CircleIcon,
  DecisionIcon,
  MeetingIcon,
  MemberIcon,
  RoleIcon,
  TaskIcon,
  ThreadIcon,
} from 'src/icons'
import { SearchItem } from './searchTypes'

interface Props {
  item: SearchItem
  size?: AvatarProps['size']
}

export const searchIcons = {
  Member: MemberIcon,
  Role: RoleIcon,
  Circle: CircleIcon,
  Thread: ThreadIcon,
  Meeting: MeetingIcon,
  Task: TaskIcon,
  Decision: DecisionIcon,
}

export default function SearchResultIcon({ item, size }: Props) {
  if (item.type === SearchTypes.Member) {
    return (
      <Avatar
        name={item.title}
        src={item.picture || undefined}
        size={size === 'sm' ? 'xs' : 'sm'}
        ml="-8px"
      />
    )
  }
  if (item.type === SearchTypes.CreateAction) {
    return null
  }

  const Icon = searchIcons[item.type]
  const iconSize = size === 'sm' ? 20 : 24

  return <Icon size={iconSize} />
}
