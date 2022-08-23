import { Avatar } from '@chakra-ui/react'
import { SearchTypes } from '@shared/model/search'
import React from 'react'
import {
  FiArrowRightCircle,
  FiCalendar,
  FiCheckSquare,
  FiCircle,
  FiDisc,
  FiMessageSquare,
  FiPlus,
} from 'react-icons/fi'
import { SearchItem } from './searchTypes'

interface Props {
  item: SearchItem
}

export default function SearchResultIcon({ item }: Props) {
  switch (item.type) {
    case SearchTypes.CreateAction:
      return <FiPlus />
    case SearchTypes.Role:
      return <FiCircle />
    case SearchTypes.Circle:
      return <FiDisc />
    case SearchTypes.Thread:
      return <FiMessageSquare />
    case SearchTypes.Task:
      return <FiCheckSquare />
    case SearchTypes.Member:
      return (
        <Avatar
          name={item.title}
          src={item.picture || undefined}
          size="sm"
          ml="-10px"
        />
      )
    case SearchTypes.Decision:
      return <FiArrowRightCircle />
    case SearchTypes.Meeting:
      return <FiCalendar />
  }
}
