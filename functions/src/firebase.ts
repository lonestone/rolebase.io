import { Circle } from '@shared/model/circle'
import { Log } from '@shared/model/log'
import { Meeting } from '@shared/model/meeting'
import { Member } from '@shared/model/member'
import { Org } from '@shared/model/org'
import { Role } from '@shared/model/role'
import { User } from '@shared/model/user'
import * as admin from 'firebase-admin'

export const firebaseAdmin = admin.initializeApp()
export const auth = firebaseAdmin.auth()
export const firestore = firebaseAdmin.firestore()
export const storage = firebaseAdmin.storage()

export function getCollection<DocumentData>(collectionPath: string) {
  return firestore.collection(
    collectionPath
  ) as admin.firestore.CollectionReference<DocumentData>
}

export const collections = {
  circles: getCollection<Circle>('circles'),
  meetings: getCollection<Meeting>('meetings'),
  members: getCollection<Member>('members'),
  orgs: getCollection<Org>('orgs'),
  roles: getCollection<Role>('roles'),
  users: getCollection<User>('users'),
  logs: getCollection<Log>('logs'),
}
