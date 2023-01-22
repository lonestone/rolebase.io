import {
  EntitiesChanges,
  EntitiesMethods,
  EntitiesTypes,
  EntityChange,
  LogEntry,
} from '../../model/log'
import { cancelEntityChanges } from './cancelEntityChanges'

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
