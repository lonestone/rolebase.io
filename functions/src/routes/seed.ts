import * as express from 'express'
import { collections, auth, firestore } from '../firebase';
import { ClaimRole } from '@shared/userClaims';
import { setUserClaim } from '../setUserClaim';

const members: Array<{email: string, displayName: string, uid: string, memberId: string}> = [
    {
      email: 'admin@example.com',
      displayName: 'Admin',
      uid: '',
      memberId: '',
    }, {
      email: 'user1@example.com',
      displayName: 'User1',
      uid: '',
      memberId: '',
    }, {
      email: 'user2@example.com',
      displayName: 'User2',
      uid: '',
      memberId: ''
    }
]

function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min;
}

/**
 * Seeding script
 * http://localhost:5001/roles-app-37879/us-central1/api/seed
 * or npm run firestore:seed
 */
export const seed: express.RequestHandler = async (req, res) => {
  // Security (see package.json/scripts/firestore:seed)
  if (req.headers.authorization !== 'E1MTYyMzkwMjJ9') res.status(401).send('Unauthorized')

  // Organization
  const name = req.params.name || 'My organization';

  const orgRef = await collections.orgs.add({
    name,
    archived: false,
    defaultWorkedMinPerWeek: 35 * 60,
  })

  // Generate users
  for (const i in members) {
    const { uid, displayName, email } = await auth.createUser({
      email: members[i].email,
      emailVerified: true,
      phoneNumber: '+1123456789' + i,
      password: 'passw0rd',
      displayName: members[i].displayName,
      photoURL: 'https://static.vecteezy.com/system/resources/previews/000/420/940/original/avatar-icon-vector-illustration.jpg',
      disabled: false,
    })

    // Then on firestore
    await firestore
        .collection('users')
        .doc(uid)
        .set({ uid, displayName, email })

    // Create user member
    const memberRef = await collections.members.add({
      orgId: orgRef.id,
      userId: uid,
      archived: false,
      name: members[i].displayName,
      role: ClaimRole.Admin,
    })

    members[i].uid = uid
    members[i].memberId = memberRef.id
  }

  // Set user claim for org
  await setUserClaim(members[0].uid, orgRef.id, ClaimRole.Admin)

  // Create role
  const roleRef = await collections.roles.add({
    orgId: orgRef.id,
    archived: false,
    base: false,
    name,
    purpose: '',
    domain: '',
    accountabilities: '',
    notes: '',
    defaultMinPerWeek: null,
    singleMember: false,
    link: false,
  })

  // Create circle
  const circleRef = await collections.circles.add({
    orgId: orgRef.id,
    roleId: roleRef.id,
    parentId: null,
    members: [],
    archived: false,
  })

  // Main circles
  for (const i of Array(3).keys()) {
    const mainRole = await collections.roles.add({
      orgId: orgRef.id,
      archived: false,
      base: false,
      name: 'Circle ' + (i + 1),
      purpose: '',
      domain: '',
      accountabilities: '',
      notes: '',
      defaultMinPerWeek: null,
      singleMember: false,
      link: false,
    })
    const mainCircle = await collections.circles.add({
      orgId: orgRef.id,
      roleId: mainRole.id,
      parentId: circleRef.id,
      members: [],
      archived: false,
    })
    // Sub circles
    for (const j of Array(2).keys()) {
      const subRole = await collections.roles.add({
        orgId: orgRef.id,
        archived: false,
        base: false,
        name: `Circle ${(i + 1)} ${j + 1}`,
        purpose: '',
        domain: '',
        accountabilities: '',
        notes: '',
        defaultMinPerWeek: null,
        singleMember: false,
        link: false,
      })
      const circleMembers = []
      for (const _ of Array(getRndInteger(1, 3)).keys()) {
        const userIndex = getRndInteger(0, members.length)
        circleMembers.push({ memberId: members[userIndex].memberId, id: members[userIndex].uid })
      }
      await collections.circles.add({
        orgId: orgRef.id,
        roleId: subRole.id,
        parentId: mainCircle.id,
        members: circleMembers,
        archived: false,
      })
    }
  }

  res.send(`-> Seeding ok for organization "${name}", login with "admin@example.com" and "passw0rd"`)
}
