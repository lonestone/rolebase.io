export interface HolaspiritSheets {
  Members: HolaspiritMember[]
  Assignations: HolaspiritAssignation[]
  'Circles & Roles': HolaspiritCirclesRole[]
  Policies: HolaspiritPolicy[]
  Actions: HolaspiritAction[]
  Projects: HolaspiritProject[]
  'Projects To-do lists': HolaspiritProjectsTodolist[]
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
  'Actions',
  'Projects',
  'Projects To-do lists',
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

export interface HolaspiritAction {
  'Circle ID': string
  Circle: string
  'Role ID': string
  Role: string
  Members: string
  Status: string // 'done'
  Title: string
  Created: string // Date
  Archived: string // Date
}

export interface HolaspiritProject {
  'Circle ID': '620a2043431a815cf73d90cc'
  Circle: 'Accompagnements'
  Members: 'thomas@semawe.fr'
  Column: 'Future'
  Status: 'current'
  Title: 'Les kakemonos pour POPSU sont prêt'
  Created: string // Date
}

export interface HolaspiritProjectsTodolist {
  'Circle ID': '61384a6d5bee686c19342ad1'
  Circle: 'Blossom HappyWork'
  Project: 'La stratégie Marketing España est sur les rails'
  Item: 'deal avec Dani pour démarrage en avril'
  Checked: true
}

export interface HolaspiritPublication {
  'Circle ID': '627e2fa7c9e8873b7d750b35'
  Circle: 'RAO'
  'Role ID': '62348e0cd73aa24da3345a54'
  Role: 'Admin AO'
  Title: "Demander à l'acheteur pourquoi l'offre a été retenue ou rejetée"
  Description: "<p>Dans le cadre de la relation avec l'acheteur, nous avons la possibilité de demander des éléments dans le cadre d'une procédure formalisée. <br /></p><ul><li><p>le nom de l'attributaire</p></li><li><p>le montant du marché ou le devis estimatif pour les marché à bon de commande</p></li><li><p>le classement final de l'attributaire</p></li><li><p>le classement de l'attributaire critère par critère et le nombre de point par critère</p></li><li><p>le montant des autres offres non retenues</p></li><li><p>l'analyse de l'offre de Sémawé critère par critère</p></li><li><p>l'analyse de l'offre retenue critère par critère</p></li></ul><p><br /></p>"
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
  'Circle ID': '620a2043431a815cf73d90cc'
  Circle: 'Accompagnements'
  Template: 'Gouvernance'
  Status: 'closed'
  'Opened At': string // Date
  'Duration (s)': 177
  'Scheduled At': string // Date
  Tensions: 1
}
