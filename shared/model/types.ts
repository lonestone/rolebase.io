import { MembersScope } from './member'

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>

export type WithId<Entity> = Entity & { id: string }

export interface EntityWithParticipants {
  circleId: string
  participantsScope: MembersScope
  participantsMembersIds: string[]
}

export enum EntityFilters {
  All = 'All',
  Circle = 'Circle',
  Invited = 'Invited',
  NotInvited = 'NotInvited',
}
