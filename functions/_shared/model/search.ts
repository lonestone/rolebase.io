// Objects stored in Algolia

export interface SearchDoc {
  objectID: string // Mandatory Algolia field
  boost: number
  orgId: string
  type: SearchTypes
  title: string
  description: string
  picture?: string
  createdAt?: string
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
}

export interface AlgoliaConfig {
  appId: string
  apiKey: string
  indexName: string
}
