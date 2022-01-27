import { WithId } from '@shared/types'
import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import {
  addDoc,
  collection,
  CollectionReference,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  Query,
  setDoc,
  UpdateData,
  updateDoc,
} from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { memoize } from 'src/memoize'
import settings from '../settings'

const app = initializeApp(settings.firebase)

export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)
export const functions = getFunctions(app)

if (location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(firestore, 'localhost', 8080)
  connectFunctionsEmulator(functions, 'localhost', 5001)
  connectStorageEmulator(storage, 'localhost', 9199)
}

export function getCollection<Entity>(collectionPath: string) {
  return collection(firestore, collectionPath) as CollectionReference<Entity>
}

export function getSubCollection<Entity>(
  doc: DocumentReference<any>,
  collectionPath: string
) {
  return collection(doc, collectionPath) as CollectionReference<Entity>
}

export async function createEntity<Entity>(
  collection: CollectionReference<Entity>,
  entity: Entity,
  id?: string
): Promise<WithId<Entity>> {
  delete (entity as any).id // Remove id if it exists
  const newDoc = await (id ? doc(collection, id) : addDoc(collection, entity))
  if (id) {
    setDoc(newDoc, entity)
  }
  const snapshot = await getDoc(newDoc)
  return { ...snapshot.data()!, id: newDoc.id }
}

export type SubscriptionFn<Data> = (
  onData: (data: Data) => void,
  onError: (error: Error) => void
) => () => void // Return unsubscribe function

// Keep a stack of same subscriptions to avoid duplicating them
export function stackSubscribe<Data>(
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
        lastData = undefined
        lastError = undefined
      }
    }
  }
}

// Subscribe to query's results
export function subscribeQuery<Entity>(
  query: Query<Entity>
): SubscriptionFn<WithId<Entity>[]> {
  return stackSubscribe((onData, onError) => {
    const entries: WithId<Entity>[] = []
    return onSnapshot(
      query,
      (querySnapshot) => {
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
      },
      onError
    )
  })
}

// Get results from query once
export async function executeQuery<Entity>(
  query: Query<Entity>
): Promise<WithId<Entity>[]> {
  const querySnapshot = await getDocs(query)
  return querySnapshot.docs.map((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }))
}

// Subscribe to document changes
export function subscribeDoc<Entity>(
  doc: DocumentReference<Entity>
): SubscriptionFn<WithId<Entity>> {
  return stackSubscribe((onData, onError) => {
    return onSnapshot(
      doc,
      (doc) => {
        const data = doc.data()
        if (data) {
          onData({ id: doc.id, ...data })
        } else {
          onError(new Error('Document not found'))
        }
      },
      onError
    )
  })
}

// Get document once
export async function getDocData<Entity>(
  doc: DocumentReference<Entity>
): Promise<WithId<Entity> | undefined> {
  const snapshot = await getDoc(doc)
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
