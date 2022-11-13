import {
  EntitiesChanges,
  EntitiesMethods,
  EntitiesTypes,
  EntityChange,
  EntityChangeType,
  EntityMethodGet,
  EntityMethodUpdate,
  LogEntry,
} from '@shared/model/log'
import isEqual from 'lodash.isequal'

export async function detectRecentEntityChanges<Entity>(
  entityChanges: EntityChange<Entity>[],
  getEntity: EntityMethodGet<Entity>
): Promise<boolean> {
  for (const entityChange of entityChanges) {
    // Entity update
    if (entityChange.type === EntityChangeType.Update) {
      const currentEntity = await getEntity(entityChange.id)
      if (!currentEntity) return false

      // Check properties that have changed
      for (const key in entityChange.newData) {
        const value = currentEntity[key]
        const newValue = entityChange.newData[key]
        if (!isEqual(value, newValue)) {
          return true
        }
      }
    }
  }
  return false
}

// Determine if an entity has changed since changes in an entities log
export async function detectRecentEntitiesChanges(
  log: LogEntry,
  methods: EntitiesMethods
): Promise<boolean> {
  for (const key in log.changes) {
    const type = key as keyof EntitiesTypes
    const changes = log.changes[type]
    if (!changes) continue
    const hasChanged = await detectRecentEntityChanges<any>(
      changes,
      methods[type].get
    )
    if (hasChanged) {
      return true
    }
  }
  return false
}

export async function cancelEntityChanges<Entity extends { archived: boolean }>(
  entityChanges: EntityChange<Entity>[] | undefined,
  getEntity: EntityMethodGet<Entity>,
  updateEntity: EntityMethodUpdate<Entity>
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
export async function cancelLogChanges(
  log: LogEntry,
  methods: EntitiesMethods
): Promise<EntitiesChanges> {
  const changes: EntitiesChanges = {}
  for (const key in log.changes) {
    const type = key as keyof EntitiesTypes

    // Cancel each change and return new changes
    const entityChanges = (await cancelEntityChanges<{ archived: boolean }>(
      log.changes[type],
      methods[type].get,
      methods[type].update
    )) as EntityChange<any>[]

    if (entityChanges.length === 0) continue
    changes[type] = entityChanges
  }
  return changes
}
