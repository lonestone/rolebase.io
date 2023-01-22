import { EntitiesMethods, EntitiesTypes, LogEntry } from '../../model/log'
import { detectRecentEntityChanges } from './detectRecentEntityChanges'

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
