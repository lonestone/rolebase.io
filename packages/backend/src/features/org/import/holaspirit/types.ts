export interface HolaspiritSheets {
  Members: HolaspiritMember[]
  Assignations: HolaspiritAssignation[]
  'Circles & Roles': HolaspiritCirclesRole[]
  Policies: HolaspiritPolicy[]
  Tasks: HolaspiritTask[]
  Publications: HolaspiritPublication[]
  Checklists: HolaspiritChecklist[]
  Metrics: HolaspiritMetric[]
  Meeting: HolaspiritMeeting[]
}

export const holaspiritSheetsNames: Array<keyof HolaspiritSheets> = [
  'Members',
  'Assignations',
  'Circles & Roles',
  'Policies',
  'Tasks',
  'Publications',
  'Checklists',
  'Metrics',
  'Meeting',
]

export interface HolaspiritMember {
  'Last name': string
  'First name': string
  Email: string
  Phone: string
  Language: string
  Avatar: string
  Created: string // Date
  'Last connection': string // Date
  Privilege: 'owner' | 'admin' | 'member'
  Suspended: false
  'Role count': number
}

export interface HolaspiritAssignation {
  'Last name': string
  'First name': string
  Email: string
  'Circle ID': string
  Circle: string
  'Role ID'?: string
  Role?: string
  TimeSpent: number
  Since?: string // Date
  Until?: string // Date
  Core: true
}

export interface HolaspiritCirclesRole {
  'Circle ID'?: string
  Circle?: string
  'Role ID': string
  Role: string
  HasAssignation: true
  Created: string // Date
  TimeSpent: number
  IsCircle: boolean
  Purpose: string
  Domains: string
  Accountabilities: string
  Strategy?: string
  ['OBJECTIFS CLES']?: string
  NOTES?: string
}

export interface HolaspiritPolicy {
  'Circle ID': string
  Circle: string
  'Role ID'?: string
  Role?: string
  Domain: string
  Policy: string
  Description?: string
}

export interface HolaspiritTask {
  'Circle ID'?: string
  Circle?: string
  'Role ID'?: string
  Role?: string
  Members?: string
  Status: 'current' | 'done'
  Title: string
  Description?: string
  Created: string // Date
  Archived: string // Date
}

export interface HolaspiritBoard {
  'Circle ID': string
  Circle: string
  'Role ID'?: string
  Status: 'current' | 'archived'
  Title: string
  Created: string // Date
}

export interface HolaspiritPublication {
  'Circle ID': string
  Circle: string
  'Role ID': string
  Role: string
  Title: string
  Description: string
  Type: string
}

export interface HolaspiritChecklist {
  'Circle ID': string
  Circle: string
  'Role ID'?: string
  Role?: string
  Recurrence: string
  Members: string
  Title: string
  Description?: string
}

export interface HolaspiritMetric {
  'Circle ID': string
  Circle: string
  'Role ID'?: string
  Role?: string
  Recurrence: string
  Members: string
  Title: string
  Description?: string
}

export interface HolaspiritMeeting {
  'Circle ID': string
  Circle: string
  Template: string
  Status: 'closed'
  'Opened At': string // Date
  'Duration (s)': number
  'Scheduled At': string // Date
  Tensions: 1
}
