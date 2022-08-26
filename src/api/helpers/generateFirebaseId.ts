import { collection, doc } from 'firebase/firestore'
import { firestore } from '../firebase'

// Generate an ID for a new Firestore doc
// We're using a new instance of firestore doc without persisting it
export const generateFirebaseId = () => doc(collection(firestore, 'a')).id
