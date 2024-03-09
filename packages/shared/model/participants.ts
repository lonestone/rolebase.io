export interface EntityWithScope {
  scope: ParticipantsScope
}

export interface ParticipantsScope {
  members: string[]
  circles: ParticipantsCircleScope[]
}

export interface ParticipantsCircleScope {
  id: string
  children: boolean
  excludeMembers: string[]
}

export const defaultParticipantsScope: ParticipantsScope = {
  members: [],
  circles: [],
}
