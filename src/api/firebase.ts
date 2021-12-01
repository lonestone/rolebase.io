import { WithId } from '@shared/types'
import firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import memoize from 'memoizee'
import settings from '../settings'

const app = firebaseApp.initializeApp(settings.firebase)

export const auth = app.auth()
export const firestore = app.firestore()
export const storage = app.storage()
export const functions = app.functions()

export const Timestamp = firebaseApp.firestore.Timestamp

if (location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099')
  firestore.useEmulator('localhost', 8080)
  functions.useEmulator('localhost', 5001)
}

export function getCollection<Entity>(collectionPath: string) {
  return firestore.collection(
    collectionPath
  ) as firebase.default.firestore.CollectionReference<Entity>
}

export function getSubCollection<Entity>(
  doc: firebase.default.firestore.DocumentReference<any>,
  collectionPath: string
) {
  return doc.collection(
    collectionPath
  ) as firebase.default.firestore.CollectionReference<Entity>
}

export async function createEntity<Entity>(
  collection: firebase.default.firestore.CollectionReference<Entity>,
  entity: Entity,
  id?: string
): Promise<WithId<Entity>> {
  delete (entity as any).id // Remove id if it exists
  const doc = await (id ? collection.doc(id) : collection.add(entity))
  if (id) {
    doc.set(entity)
  }
  const snapshot = await doc.get()
  return { ...snapshot.data()!, id: doc.id }
}

export type SubscriptionFn<Data> = (
  onData: (data: Data) => void,
  onError: (error: Error) => void
) => () => void // Return unsubscribe function

// Keep a stack of same subscriptions to avoid duplicating them
function stackSubscribe<Data>(
  subscribe: SubscriptionFn<Data>
): SubscriptionFn<Data> {
  let unsubscribe: undefined | (() => void)
  let lastData: Data | undefined
  let lastError: Error | undefined
  const onDataListeners: ((data: Data) => void)[] = []
  const onErrorListeners: ((error: Error) => void)[] = []

  const onDataInternal = (data: Data) => {
    // console.log('DEBUG data', data)
    lastData = data
    lastError = undefined
    onDataListeners.forEach((listener) => listener(data))
  }
  const onErrorInternal = (error: Error) => {
    // console.log('DEBUG error', error)
    lastError = error
    lastData = undefined
    onErrorListeners.forEach((listener) => listener(error))
  }

  // Return new subscribe function
  return (onData, onError) => {
    onDataListeners.push(onData)
    onErrorListeners.push(onError)

    if (!unsubscribe) {
      // New subscription (first to listen)
      // console.log('DEBUG subscribe')
      unsubscribe = subscribe(onDataInternal, onErrorInternal)
    } else {
      // Subscription already exists
      // We send last data and error to new listener
      if (lastData) onData(lastData)
      if (lastError) onError(lastError)
    }

    // Unsubscribe
    return () => {
      // Remove listeners
      onDataListeners.splice(onDataListeners.indexOf(onData), 1)
      onErrorListeners.splice(onErrorListeners.indexOf(onError), 1)
      // If no more listeners, unsubscribe
      if (onDataListeners.length === 0) {
        // console.log('DEBUG unsubscribe')
        unsubscribe?.()
        unsubscribe = undefined
      }
    }
  }
}

// Subscribe to query's results
export function subscribeQuery<Entity>(
  query: firebase.default.firestore.Query<Entity>
): SubscriptionFn<WithId<Entity>[]> {
  return stackSubscribe((onData, onError) => {
    const entries: WithId<Entity>[] = []
    return query.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((changes) => {
        if (changes.type === 'modified' || changes.type === 'removed') {
          entries.splice(changes.oldIndex, 1)
        }
        if (changes.type === 'added' || changes.type === 'modified') {
          entries.splice(changes.newIndex, 0, {
            id: changes.doc.id,
            ...changes.doc.data(),
          })
        }
      })
      onData([...entries]) // Spread to avoid side effects
    }, onError)
  })
}

// Get results from query once
export async function executeQuery<Entity>(
  query: firebase.default.firestore.Query<Entity>
): Promise<WithId<Entity>[]> {
  const querySnapshot = await query.get()
  return querySnapshot.docs.map((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }))
}

// Subscribe to document changes
export function subscribeDoc<Entity>(
  doc: firebase.default.firestore.DocumentReference<Entity>
): SubscriptionFn<WithId<Entity>> {
  return stackSubscribe((onData, onError) => {
    return doc.onSnapshot((doc) => {
      const data = doc.data()
      if (data) {
        onData({ id: doc.id, ...data })
      } else {
        onError(new Error('Document not found'))
      }
    }, onError)
  })
}

// Get document once
export async function getDoc<Entity>(
  doc: firebase.default.firestore.DocumentReference<Entity>
): Promise<WithId<Entity> | undefined> {
  const snapshot = await doc.get()
  const data = snapshot.data()
  if (!data) return undefined
  return { id: doc.id, ...data }
}

interface EntityMethodsOptions<Entity, CreateParam = Entity> {
  createTransform?: (data: CreateParam) => Entity
}

// Get on object of methods to manipulate entities
export function getEntityMethods<
  Entity,
  CreateEntity extends Entity,
  CreateParam = Entity
>(
  collection: firebase.default.firestore.CollectionReference<Entity>,
  options?: EntityMethodsOptions<CreateEntity, CreateParam>
) {
  const createTransform =
    options?.createTransform || ((entity) => entity as any)

  return {
    // Subscribe entity by id
    subscribe: memoize(
      (id: string): SubscriptionFn<WithId<Entity>> =>
        subscribeDoc(collection.doc(id))
    ),

    // Get entity by id
    get: (id: string): Promise<WithId<Entity> | undefined> =>
      getDoc(collection.doc(id)),

    // Create entity
    create: (data: CreateParam, id?: string): Promise<WithId<Entity>> =>
      createEntity(collection, createTransform(data), id),

    // Update entity by id
    update: (id: string, data: Partial<Entity>): Promise<void> =>
      collection.doc(id).update(data),

    // Delete entity by id
    delete: (id: string): Promise<void> => collection.doc(id).delete(),
  }
}
