import { SearchTypes } from '@shared/model/search'

export type SearchItem = {
  id: string
  type: SearchTypes
  text: string
  title: string
  circleId?: string
  picture?: string
  date?: string
}
