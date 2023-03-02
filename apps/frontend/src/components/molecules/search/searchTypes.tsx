import { SearchTypes } from '@shared/model/search'

export type SearchItem = {
  id: string
  type: SearchTypes
  text: string
  title: string
  picture?: string
}
