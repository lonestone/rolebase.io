// Objects stored in Algolia

/* 
Date needs to be Unix timestamp for Algolia search to be able to filter/sort
https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/in-depth/what-is-in-a-record/#dates 
*/

export interface SearchDoc {
  objectID: string // Mandatory Algolia field
  boost: number
  orgId: string
  type: SearchTypes
  title: string
  description: string
  picture?: string
  createdAt?: number
  startDate?: number
}

export enum SearchTypes {
  CreateAction = 'CreateAction',
  Member = 'Member',
  Role = 'Role',
  Circle = 'Circle',
  Thread = 'Thread',
  Meeting = 'Meeting',
  Task = 'Task',
  Decision = 'Decision',
  Skill = 'Skill',
}

export interface AlgoliaConfig {
  appId: string
  apiKey: string
  indexName: string
}
