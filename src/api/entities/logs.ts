import {
  EntitiesLog,
  EntityLog,
  EntityLogType,
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

export async function detectEntityLogChanges<Entity>(
  entityLogs: EntityLog<Entity>[],
  getEntity: (id: string) => Promise<WithId<Entity> | undefined>
): Promise<boolean> {
  for (const entityLog of entityLogs) {
    // Entity update
    if (entityLog.type === EntityLogType.Update) {
      const currentEntity = await getEntity(entityLog.id)
      if (!currentEntity) return true

      // Check properties that have changed
      for (const key in entityLog.newData) {
        const value = currentEntity[key]
        const newValue = entityLog.newData[key]
        return !isEqual(value, newValue)
      }
    }
  }
  return false
}

// Determine if an entity has changed since changes in an entities log
export async function detectEntitiesLogChanges(
  changes: EntitiesLog
): Promise<boolean> {
  const hadCirclesChanges = detectEntityLogChanges(
    changes.circles || [],
    getCircle
  )
  const hadRolesChanges = detectEntityLogChanges(changes.roles || [], getRole)
  const hadMemberChanges = detectEntityLogChanges(
    changes.members || [],
    getMember
  )
  return hadCirclesChanges || hadRolesChanges || hadMemberChanges
}

export async function cancelEntityLogs<Entity extends { archived: boolean }>(
  entityLogs: EntityLog<Entity>[] | undefined,
  getEntity: (id: string) => Promise<WithId<Entity> | undefined>,
  updateEntity: (id: string, data: Partial<Entity>) => Promise<void>
): Promise<EntityLog<Entity>[]> {
  if (!entityLogs) return []
  const changes: EntityLog<Entity>[] = []

  for (const entityLog of entityLogs) {
    const currentEntity = await getEntity(entityLog.id)
    if (!currentEntity) {
      console.error('Entity not found', entityLog.id)
      continue
    }

    if (entityLog.type === EntityLogType.Create) {
      // Revert creation = archive entity
      if (currentEntity.archived) {
        continue
      }
      await updateEntity(entityLog.id, { archived: true } as Partial<Entity>)
      changes.push({
        type: EntityLogType.Update,
        id: entityLog.id,
        prevData: { archived: false } as Partial<Entity>,
        newData: { archived: true } as Partial<Entity>,
      })
    } else if (entityLog.type === EntityLogType.Update) {
      // Revert update
      const changePrevData: Partial<Entity> = {}
      for (const key in entityLog.prevData) {
        changePrevData[key] = currentEntity[key]
      }
      await updateEntity(entityLog.id, entityLog.prevData)
      changes.push({
        type: EntityLogType.Update,
        id: entityLog.id,
        prevData: changePrevData,
        newData: entityLog.prevData,
      })
    }
  }
  return changes
}

// Revert changes in entities and get new changes
export async function cancelLog(log: LogEntry): Promise<EntitiesLog> {
  const changes: EntitiesLog = {
    circles: await cancelEntityLogs(
      log.changes.circles,
      getCircle,
      updateCircle
    ),
    roles: await cancelEntityLogs(log.changes.roles, getRole, updateRole),
    members: await cancelEntityLogs(
      log.changes.members,
      getMember,
      updateMember
    ),
  }

  // Remove empty properties
  for (const key in changes) {
    const k = key as keyof typeof changes
    if (!changes[k]?.length) {
      delete changes[k]
    }
  }

  // Mark log as cancelled
  await updateLog(log.id, {
    canceled: true,
  })

  return changes
}
