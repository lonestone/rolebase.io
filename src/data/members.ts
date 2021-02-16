import { useCollectionData } from 'react-firebase-hooks/firestore'
import { FirebaseHookReturn, firestore } from './firebase'

interface Member {
  name: string
}

const collection = firestore.collection('members')

export function useMembers(): FirebaseHookReturn<Member> {
  return useCollectionData<Member>(collection)
}
