import { WithId } from '@shared/types'
import {
  CollectionReference,
  deleteDoc,
  doc,
  UpdateData,
  updateDoc,
} from 'firebase/firestore'
import { memoize } from 'src/memoize'
import { createEntity } from './createEntity'
import { getDocData } from './getDocData'
import { SubscriptionFn } from './subscribe'
import { subscribeDoc } from './subscribeDoc'

export interface EntityMethodsOptions<Entity, CreateParam = Entity> {
  createTransform?: (data: CreateParam) => Entity
}

// Get on object of methods to manipulate entities
export function getEntityMethods<
  Entity,
  CreateEntity extends Entity,
  CreateParam = Entity
>(
  collection: CollectionReference<Entity>,
  options?: EntityMethodsOptions<CreateEntity, CreateParam>
) {
  const createTransform =
    options?.createTransform || ((entity) => entity as any)

  return {
    // Subscribe entity by id
    subscribe: memoize(
      (id: string): SubscriptionFn<WithId<Entity>> =>
        subscribeDoc(doc(collection, id))
    ),

    // Get entity by id
    get: (id: string): Promise<WithId<Entity> | undefined> =>
      getDocData(doc(collection, id)),

    // Create entity
    create: (data: CreateParam, id?: string): Promise<WithId<Entity>> =>
      createEntity(collection, createTransform(data), id),

    // Update entity by id
    update: (id: string, data: Partial<Entity>): Promise<void> =>
      updateDoc(doc(collection, id), data as UpdateData<Entity>),

    // Delete entity by id
    delete: (id: string): Promise<void> => deleteDoc(doc(collection, id)),
  }
}
