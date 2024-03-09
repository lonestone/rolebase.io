import {
  EntityChange,
  EntityChangeType,
  EntityMethodGet,
  EntityMethodUpdate,
} from '../../model/log'

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
