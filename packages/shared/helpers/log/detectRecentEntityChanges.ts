import isEqual from 'lodash.isequal'
import {
  EntityChange,
  EntityChangeType,
  EntityMethodGet,
} from '../../model/log'

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
