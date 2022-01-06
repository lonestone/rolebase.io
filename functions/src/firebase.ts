import { Circle } from '@shared/circle'
import { Meeting } from '@shared/meeting'
import { Member } from '@shared/member'
import { Org } from '@shared/org'
import { Role } from '@shared/role'
import { User } from '@shared/user'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

interface Config {
  mailjet: {
    public: string
    private: string
  }
  security: {
    invitation_token: string // eslint-disable-line camelcase
  }
}

export const firebaseAdmin = admin.initializeApp()
export const firestore = firebaseAdmin.firestore()
export const storage = firebaseAdmin.storage()
export const config = functions.config() as Config

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
}
