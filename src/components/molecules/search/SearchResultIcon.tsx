import { Avatar } from '@chakra-ui/react'
import { SearchTypes } from '@shared/model/search'
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

export default function SearchResultIcon({ item }: Props) {
  if (item.type === SearchTypes.Member) {
    return (
      <Avatar
        name={item.title}
        src={item.picture || undefined}
        size="sm"
        ml="-10px"
      />
    )
  }
  if (item.type === SearchTypes.CreateAction) {
    return null
  }

  const Icon = searchIcons[item.type]
  return <Icon style={{ minWidth: 'fit-content' }} />
}
