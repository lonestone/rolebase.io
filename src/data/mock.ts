import { CircleEntry } from './circles'
import { RoleEntry } from './roles'

export const rolesMock: RoleEntry[] = [
  { id: '1', name: 'Secrétaire' },
  { id: '2', name: 'Facilitateur' },
  { id: '3', name: 'Account Manager' },
  { id: '4', name: 'Développeur' },
  { id: '5', name: 'Agence' },
  { id: '6', name: 'Studio' },
  { id: '7', name: 'Direction technique' },
]

export const circlesMock: CircleEntry[] = [
  // Agence
  {
    id: '1',
    roleId: '5',
    parentId: null,
    membersIds: [],
  },
  // Secrétaire
  { id: '2', roleId: '1', parentId: '1', membersIds: ['CXKUBbf1MCNEZ0IADdLa'] },
  // Facilitateur
  { id: '3', roleId: '2', parentId: '1', membersIds: ['9YSM9K1DNf19lZinjIsW'] },
  // Agence / Account Manager
  {
    id: '4',
    roleId: '3',
    parentId: '1',
    membersIds: ['CXKUBbf1MCNEZ0IADdLa', 'rcmpUX74F4UGWtkOkosf'],
  },
  // Agence / Développeur
  { id: '5', roleId: '4', parentId: '1', membersIds: ['9YSM9K1DNf19lZinjIsW'] },
  // Agence / Direction technique
  {
    id: '6',
    roleId: '7',
    parentId: '1',
    membersIds: [],
  },
  // Agence / Direction technique / Secrétaire
  { id: '7', roleId: '1', parentId: '6', membersIds: ['9YSM9K1DNf19lZinjIsW'] },
  // Agence / Direction technique / Facilitateur
  { id: '8', roleId: '2', parentId: '6', membersIds: ['CXKUBbf1MCNEZ0IADdLa'] },
  // Studio
  {
    id: '9',
    roleId: '6',
    parentId: null,
    membersIds: [],
  },
  // Agence / Direction technique / Secrétaire
  {
    id: '10',
    roleId: '1',
    parentId: '9',
    membersIds: ['9YSM9K1DNf19lZinjIsW'],
  },
  // Agence / Direction technique / Facilitateur
  {
    id: '11',
    roleId: '2',
    parentId: '9',
    membersIds: ['CXKUBbf1MCNEZ0IADdLa'],
  },
]
