import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'

export const oldIds: Map<string, { newId: string; type: string }> = new Map()

export async function saveOldIds(
  type: string,
  set: Array<{ oldId: string; newId: string }>
) {
  // Save ids in DB
  await adminRequest(
    gql(`
      mutation SaveOldIds($objects: [old_id_insert_input!]!) {
        insert_old_id(objects: $objects) {
          returning {
            id
          }
        }
      }
    `),
    {
      objects: set.map(({ oldId, newId }) => ({ id: newId, oldId, type })),
    }
  )

  // Save ids in memory and log
  for (const { oldId, newId } of set) {
    oldIds.set(oldId, { newId, type })
    console.log(`Imported ${type}: ${oldId} -> ${newId}`)
  }
}

export async function retrieveOldIds() {
  const result = await adminRequest(
    gql(`
      query GetOldIds {
        old_id {
          id
          oldId
          type
        }
      }
    `)
  )

  // Save ids in memory and log
  for (const { id, oldId, type } of result.old_id) {
    oldIds.set(oldId, { newId: id, type })
  }
}

export function id(id: string): string {
  const newId = oldIds.get(id)?.newId
  if (!newId) throw new Error(`No id for ${id}`)
  return newId
}

export function replaceIdsInText(text: string): string {
  if (text.length < 20) return text
  let newText = text
  for (const [oldId, { newId }] of oldIds) {
    newText = newText.replaceAll(oldId, newId)
  }
  return newText
}

export function replaceIdsInTexts<T>(obj: T): T {
  if (typeof obj === 'string') {
    return replaceIdsInText(obj) as T
  }
  if (Array.isArray(obj)) {
    return obj.map((x) => replaceIdsInTexts(x)) as T
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, replaceIdsInTexts(value)])
    ) as T
  }
  return obj
}
