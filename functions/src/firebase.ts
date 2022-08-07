import { Activity } from '@shared/model/activity'
import { Circle } from '@shared/model/circle'
import { Decision } from '@shared/model/decision'
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
  activities: getCollection<Activity>('activities'),
  circles: getCollection<Circle>('circles'),
  decisions: getCollection<Decision>('decisions'),
  meetings: getCollection<Meeting>('meetings'),
  members: getCollection<Member>('members'),
  logs: getCollection<Log>('logs'),
  orgs: getCollection<Org>('orgs'),
  roles: getCollection<Role>('roles'),
  users: getCollection<User>('users'),
}
