import * as admin from 'firebase-admin'
import { cert, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

initializeApp({
  credential: cert({
    type: 'service_account',
    project_id: 'roles-app-37879',
    private_key_id: '40d1a416303d19d2333c816839c6b42a76f2d44a',
    private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/gm, '\n'),
    client_email:
      'firebase-adminsdk-bxleu@roles-app-37879.iam.gserviceaccount.com',
    client_id: '103058318608250332346',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bxleu%40roles-app-37879.iam.gserviceaccount.com',
  } as any),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
})

export const auth = getAuth()
export const firestore = getFirestore()
export const storage = getStorage().bucket('roles-app-37879.appspot.com')

export function getCollection<DocumentData>(collectionPath: string) {
  return firestore.collection(
    collectionPath
  ) as admin.firestore.CollectionReference<DocumentData>
}
