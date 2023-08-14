import { Avatar, AvatarProps } from '@chakra-ui/react'
import { SearchTypes } from '@shared/model/search'
import React from 'react'
import {
  FiCalendar,
  FiCheckSquare,
  FiCircle,
  FiDisc,
  FiMessageSquare,
  FiTriangle,
  FiUser,
} from 'react-icons/fi'
import { SearchItem } from './searchTypes'

interface Props {
  item: SearchItem
  size?: AvatarProps['size']
}

export const searchIcons = {
  Member: FiUser,
  Role: FiCircle,
  Circle: FiDisc,
  Thread: FiMessageSquare,
  Meeting: FiCalendar,
  Task: FiCheckSquare,
  Decision: FiTriangle,
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
  return <Icon />
}
