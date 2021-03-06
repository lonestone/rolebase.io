import React, { createContext, ReactNode, useContext } from 'react'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { FirebaseHookReturn } from './firebase'

export function createDataHooks<
  DocumentData extends firebase.default.firestore.DocumentData,
  EntryData extends Data<DocumentData, 'id', 'id'>
>(collection: firebase.default.firestore.CollectionReference<DocumentData>) {
  // Create context
  const context = createContext<FirebaseHookReturn<EntryData[]> | undefined>(
    undefined
  )

  // Hooks to retrieve collection data and subscribe
  function useCollection(): FirebaseHookReturn<EntryData[]> {
    const result = useCollectionData<DocumentData, 'id', 'id'>(collection, {
      idField: 'id',
    })

    // Sort entries if they have names
    if (result[0]?.[0]?.name) {
      result[0].sort((a, b) => ((a.name || '') < (b.name || '') ? -1 : 1))
    }
    return result as FirebaseHookReturn<EntryData[]>
  }

  function useContextCollection(): FirebaseHookReturn<EntryData[]> {
    const contextValue = useContext(context)
    return (
      contextValue || [
        undefined,
        false,
        new Error('No context for useContextCollection'),
      ]
    )
  }

  // Hooks to retrieve document data and subscribe
  function useDocument(id: string): FirebaseHookReturn<EntryData> {
    return useDocumentData<DocumentData, 'id', 'id'>(collection.doc(id), {
      idField: 'id',
    }) as FirebaseHookReturn<EntryData>
  }

  function useContextDocument(id: string): FirebaseHookReturn<EntryData> {
    // Try to find entry in context list
    const contextValue = useContext(context)
    if (!contextValue) {
      return [undefined, false, new Error('No context for useContextDocument')]
    }
    if (contextValue[0]) {
      // Retrieve entry from list
      const entry = contextValue[0].find((e) => e.id === id)
      if (entry) return [entry, false, undefined]
    }
    // Data is loading or there is an error
    return [undefined, contextValue[1], contextValue[2]]
  }

  // Provider to centralize data subscribing
  // Useful to avoid subscribing multiple times to the same data
  function Provider({ children }: { children?: ReactNode }) {
    const value = useCollection()
    return <context.Provider value={value}>{children}</context.Provider>
  }

  return {
    useCollection,
    useContextCollection,
    useDocument,
    useContextDocument,
    Provider,
  }
}
