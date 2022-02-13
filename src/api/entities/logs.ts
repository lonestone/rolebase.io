import {
  EntitiesChanges,
  EntityChange,
  EntityChangeType,
  Log,
  LogEntry,
} from '@shared/log'
import { Optional, WithId } from '@shared/types'
import { limit, orderBy, query, Timestamp, where } from 'firebase/firestore'
import isEqual from 'lodash.isequal'
import { memoize } from 'src/memoize'
import { getCollection, getEntityMethods, subscribeQuery } from '../firebase'
import { getCircle, updateCircle } from './circles'
import { getMember, updateMember } from './members'
import { getRole, updateRole } from './roles'

export const collection = getCollection<Log>('logs')

const methods = getEntityMethods(collection, {
  createTransform: (log: Optional<Log, 'createdAt' | 'meetingId'>) => ({
    meetingId: null,
    createdAt: Timestamp.now(),
    ...log,
  }),
})
export const updateLog = methods.update
export const createLog = methods.create

export const subscribeLastLogs = memoize((orgId: string) =>
  subscribeQuery(
    query(
      collection,
      where('orgId', '==', orgId),
      orderBy('createdAt', 'desc'),
      limit(100)
    )
  )
)

export const subscribeLogsByMeeting = memoize(
  (orgId: string, meetingId: string) =>
    subscribeQuery(
      query(
        collection,
        where('orgId', '==', orgId),
        where('meetingId', '==', meetingId),
        orderBy('createdAt', 'desc')
      )
    )
)

export async function detectRecentEntityChanges<Entity>(
  entityChanges: EntityChange<Entity>[],
  getEntity: (id: string) => Promise<WithId<Entity> | undefined>
): Promise<boolean> {
  for (const entityChange of entityChanges) {
    // Entity update
    if (entityChange.type === EntityChangeType.Update) {
      const currentEntity = await getEntity(entityChange.id)
      if (!currentEntity) return true

      // Check properties that have changed
      for (const key in entityChange.newData) {
        const value = currentEntity[key]
        const newValue = entityChange.newData[key]
        return !isEqual(value, newValue)
      }
    }
  }
  return false
}

// Determine if an entity has changed since changes in an entities log
export async function detectRecentEntitiesChanges(
  changes: EntitiesChanges
): Promise<boolean> {
  const hadCirclesChanges = detectRecentEntityChanges(
    changes.circles || [],
    getCircle
  )
  const hadRolesChanges = detectRecentEntityChanges(
    changes.roles || [],
    getRole
  )
  const hadMemberChanges = detectRecentEntityChanges(
    changes.members || [],
    getMember
  )
  return hadCirclesChanges || hadRolesChanges || hadMemberChanges
}

export async function cancelEntityChanges<Entity extends { archived: boolean }>(
  entityChanges: EntityChange<Entity>[] | undefined,
  getEntity: (id: string) => Promise<WithId<Entity> | undefined>,
  updateEntity: (id: string, data: Partial<Entity>) => Promise<void>
): Promise<EntityChange<Entity>[]> {
  if (!entityChanges) return []
  const changes: EntityChange<Entity>[] = []

  for (const entityChange of entityChanges) {
    const currentEntity = await getEntity(entityChange.id)
    if (!currentEntity) {
      console.error('Entity not found', entityChange.id)
      continue
    }

    if (entityChange.type === EntityChangeType.Create) {
      // Revert creation = archive entity
      if (currentEntity.archived) {
        continue
      }
      await updateEntity(entityChange.id, { archived: true } as Partial<Entity>)
      changes.push({
        type: EntityChangeType.Update,
        id: entityChange.id,
        prevData: { archived: false } as Partial<Entity>,
        newData: { archived: true } as Partial<Entity>,
      })
    } else if (entityChange.type === EntityChangeType.Update) {
      // Revert update
      const changePrevData: Partial<Entity> = {}
      for (const key in entityChange.prevData) {
        changePrevData[key] = currentEntity[key]
      }
      await updateEntity(entityChange.id, entityChange.prevData)
      changes.push({
        type: EntityChangeType.Update,
        id: entityChange.id,
        prevData: changePrevData,
        newData: entityChange.prevData,
      })
    }
  }
  return changes
}

// Revert changes in entities and get new changes
export async function cancelLog(log: LogEntry): Promise<EntitiesChanges> {
  const changes: EntitiesChanges = {
    circles: await cancelEntityChanges(
      log.changes.circles,
      getCircle,
      updateCircle
    ),
    roles: await cancelEntityChanges(log.changes.roles, getRole, updateRole),
    members: await cancelEntityChanges(
      log.changes.members,
      getMember,
      updateMember
    ),
  }

  // Remove empty properties
  for (const key in changes) {
    if (!changes[key as keyof EntitiesChanges]?.length) {
      delete changes[key as keyof EntitiesChanges]
    }
  }

  // Mark log as cancelled
  await updateLog(log.id, {
    canceled: true,
  })

  return changes
}
