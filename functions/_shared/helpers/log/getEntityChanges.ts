// Diff of entity update

export function getEntityChanges<Entity>(
  prevEntity: Entity,
  newEntity: Partial<Entity>
): { prevData: Partial<Entity>; newData: Partial<Entity> } {
  const prevData: Partial<Entity> = {}
  const newData: Partial<Entity> = {}
  for (const key of Object.keys(newEntity) as (keyof Entity)[]) {
    if (prevEntity[key] !== newEntity[key]) {
      if (prevEntity[key] !== undefined) {
        prevData[key] = prevEntity[key]
      }
      if (newEntity[key] !== undefined) {
        newData[key] = newEntity[key]
      }
    }
  }
  return { prevData, newData }
}
