import { gql } from '@gql'
import { adminRequest } from '@utils/adminRequest'
import { auth, getCollection } from './firebase'
import { saveOldIds } from './oldIds'
import { User as FirebaseUser } from './_model/user'

export async function importUsers() {
  console.log('Importing users...')

  // Get all users
  let { users } = await auth.listUsers()
  users = users.filter((user) => !user.disabled)

  // Get all members
  const firestoreUsers = await getCollection<FirebaseUser>('users').get()
  const usersInfo = firestoreUsers.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      createdAt: data.createdAt?.toDate(),
    }
  })

  const newUsers = users.map((user) => {
    const info = usersInfo.find((u) => u.id === user.uid)
    return {
      email: user.email,
      displayName: info?.name || user.displayName,
      avatarUrl: user.photoURL,
      locale: 'fr',
      metadata: {},
      createdAt: (
        info?.createdAt || new Date(user.metadata.creationTime)
      ).toISOString(),
    }
  })

  // Insert users
  const result = await adminRequest(
    gql(`
        mutation ImportUsers($objects: [users_insert_input!]!) {
          insertUsers(objects: $objects) {
            returning {
              id
            }
          }
        }
      `),
    { objects: newUsers }
  )

  await saveOldIds(
    'user',
    users.map((user, i) => ({
      oldId: user.uid,
      newId: result.insertUsers!.returning[i].id,
    }))
  )
}
