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
  Timezone: string
  Avatar: string
  Created: string // Date
  'Last connection': string // Date
  Privilege: 'owner' | 'admin' | 'member'
  Suspended: boolean
  'Circle count': number
  'Role count': number
  'SCIM ID'?: string
  Compétences?: string
  Localisations?: string
  Biographie?: string
  'circle count'?: number
  'Job Title'?: string
  'Managed by'?: string
  'Manager of'?: string
}

export interface HolaspiritAssignation {
  'Last name': string
  'First name': string
  Email: string
  'Circle ID': string
  Circle: string
  'Role ID'?: string
  Role?: string
  Hiring?: string
  TimeSpent: number
  TimeSpentAssignation?: number
  TimeSpentAssignationUpdate?: string
  Since?: string // Date
  Until?: string // Date
  Scope?: string
  'Decision Maker'?: boolean
  'Circle Admin'?: boolean
}

export interface HolaspiritCirclesRole {
  'Circle ID'?: string
  Circle?: string
  'Role ID': string
  Role: string
  Template?: boolean
  Hiring?: string
  HasAssignation: boolean
  Created: string // Date
  TimeSpent: number
  IsCircle: boolean
  Purpose: string
  Domains: string
  Accountabilities: string
  Stratégie?: string
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
  'Board ID'?: string
  Board?: string
  Members?: string
  Column?: string
  Status: 'current' | 'done'
  'Task ID': string
  Title: string
  Labels?: string
  Description?: string
  'Todo Lists'?: string
  'Parent Task'?: string
  'Parent Todo List'?: string
  Created: string // Date
  'Start date'?: string // Date
  Term?: string // Date
  Completed?: string // Date
  Archived?: string // Date
  Private?: boolean
  Context?: string
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
  Member?: string
  Title: string
  Description?: string
  Type?: string
}

export interface HolaspiritChecklist {
  'Circle ID': string
  Circle: string
  'Role ID'?: string
  Role?: string
  Recurrence: string
  LastCheckDate?: string
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
  LastCheckDate?: string
  Members: string
  Title: string
  Description?: string
}

export interface HolaspiritMeeting {
  'Circle ID': string
  Circle: string
  Template: string
  Description?: string
  Status: 'closed'
  'Opened At': string // Date
  'Duration (s)': number
  'Scheduled At'?: string // Date
  'Scheduled Duration (s)'?: number
  Tensions: number
  Context?: string
}
