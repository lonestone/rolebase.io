export interface HolaspiritSheets {
  Members: HolaspiritMember[]
  Assignations: HolaspiritAssignation[]
  'Circles & Roles': HolaspiritCirclesRole[]
  Policies: HolaspiritPolicie[]
  Actions: HolaspiritAction[]
  Projects: HolaspiritProject[]
  'Projects To-do lists': HolaspiritProjectsTodolist[]
  Publications: HolaspiritPublication[]
  Checklists: HolaspiritChecklist[]
  Metrics: HolaspiritMetric[]
  Meeting: HolaspiritMeeting[]
}

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
  'Last name': 'Dantz'
  'First name': 'Sarah'
  Email: 'sarah@semawe.fr'
  'Circle ID': '63062b6763af194f735ec552'
  Circle: 'AO Métro Malraux'
  'Role ID': '63062b6863af194f735ec554'
  Role: 'Admin AO'
  TimeSpent: 0
  Since: string // Date
  Core: true
}

export interface HolaspiritCirclesRole {
  'Circle ID': '620a186b7d5d44296d371a1d'
  Circle: 'Sémawé'
  'Role ID': '61384a6d5bee686c19342f04'
  Role: '1er ministre'
  HasAssignation: true
  Created: string // Date
  TimeSpent: 0
  IsCircle: false
  Purpose: 'Le meilleur fit-for-role'
  Domains: 'Affectation des rôles pour les rôles du Cercle'
  Accountabilities: 'Nommer les meilleures personnes pour les rôles'
}

export interface HolaspiritPolicie {
  'Circle ID': '620a2043431a815cf73d90cc'
  Circle: 'Accompagnements'
  Domain: 'All functions and activities within the Circle'
  Policy: 'Espace de maturation de la pratique'
  Description: "Les Coaches et accompagnants s'engagent dans des espace de supervision ou de covision entre pairs pour murir dans leur pratique"
}

export interface HolaspiritAction {
  'Circle ID': '61384a6d5bee686c19342ad1'
  Circle: 'Blossom HappyWork'
  'Role ID': '61384a6d5bee686c19342f48'
  Role: 'Actionnaire'
  Members: 'isabelle.rappart@happywork.pro'
  Status: 'done'
  Title: 'mettre un post slack pour voyage noirmoutiers'
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
  'Circle ID': '632066c159125f42580d0f8a'
  Circle: 'Finance'
  'Role ID': '61384a6d5bee686c19343c39'
  Role: 'Analyse des entrées et sorties'
  Recurrence: 'monthly'
  Members: 'maud.ivanoff@ivolve.fr'
  Title: 'Les relevés bancaires mensuels sont intégrés au récapitulatif financier'
}

export interface HolaspiritMetric {
  'Circle ID': '632066c159125f42580d0f8a'
  Circle: 'Finance'
  'Role ID': '61384a6d5bee686c19343c39'
  Role: 'Analyse des entrées et sorties'
  Recurrence: 'monthly'
  Members: 'maud.ivanoff@ivolve.fr'
  Title: 'Entrées et Sorties €'
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
