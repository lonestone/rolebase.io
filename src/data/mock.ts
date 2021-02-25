import { CircleEntry } from './circles'
import { RoleEntry } from './roles'

export const rolesMock: RoleEntry[] = [
  {
    id: '1',
    name: 'Secrétaire',
    purpose: '',
    domain: '',
    accountabilities: '',
  },
  {
    id: '2',
    name: 'Facilitateur',
    purpose: '',
    domain: '',
    accountabilities: '',
  },
  {
    id: '3',
    name: 'Account Manager',
    purpose: '',
    domain: '',
    accountabilities: '',
  },
  {
    id: '4',
    name: 'Développeur',
    purpose: '',
    domain: '',
    accountabilities: '',
  },
  { id: '5', name: 'Agence', purpose: '', domain: '', accountabilities: '' },
  { id: '6', name: 'Studio', purpose: '', domain: '', accountabilities: '' },
  {
    id: '7',
    name: 'Direction technique',
    purpose: '',
    domain: '',
    accountabilities: '',
  },
]

export const circlesMock: CircleEntry[] = [
  // Agence
  {
    id: '1',
    roleId: '5',
    parentId: null,
    members: [],
  },
  // Secrétaire
  {
    id: '2',
    roleId: '1',
    parentId: '1',
    members: [
      { id: '2-CXKUBbf1MCNEZ0IADdLa', memberId: 'CXKUBbf1MCNEZ0IADdLa' },
    ],
  },
  // Facilitateur
  {
    id: '3',
    roleId: '2',
    parentId: '1',
    members: [
      { id: '3-9YSM9K1DNf19lZinjIsW', memberId: '9YSM9K1DNf19lZinjIsW' },
    ],
  },
  // Agence / Account Manager
  {
    id: '4',
    roleId: '3',
    parentId: '1',
    members: [
      { id: '4-CXKUBbf1MCNEZ0IADdLa', memberId: 'CXKUBbf1MCNEZ0IADdLa' },
      { id: '4-rcmpUX74F4UGWtkOkosf', memberId: 'rcmpUX74F4UGWtkOkosf' },
    ],
  },
  // Agence / Développeur
  {
    id: '5',
    roleId: '4',
    parentId: '1',
    members: [
      { id: '5-9YSM9K1DNf19lZinjIsW', memberId: '9YSM9K1DNf19lZinjIsW' },
      { id: '5-CXKUBbf1MCNEZ0IADdLa', memberId: 'CXKUBbf1MCNEZ0IADdLa' },
    ],
  },
  // Agence / Direction technique
  {
    id: '6',
    roleId: '7',
    parentId: '1',
    members: [],
  },
  // Agence / Direction technique / Secrétaire
  {
    id: '7',
    roleId: '1',
    parentId: '6',
    members: [
      { id: '7-9YSM9K1DNf19lZinjIsW', memberId: '9YSM9K1DNf19lZinjIsW' },
    ],
  },
  // Agence / Direction technique / Facilitateur
  {
    id: '8',
    roleId: '2',
    parentId: '6',
    members: [
      { id: '8-CXKUBbf1MCNEZ0IADdLa', memberId: 'CXKUBbf1MCNEZ0IADdLa' },
    ],
  },
  // Studio
  {
    id: '9',
    roleId: '6',
    parentId: null,
    members: [],
  },
  // Studio / Secrétaire
  {
    id: '10',
    roleId: '1',
    parentId: '9',
    members: [
      { id: '10-9YSM9K1DNf19lZinjIsW', memberId: '9YSM9K1DNf19lZinjIsW' },
    ],
  },
  // Studio / Facilitateur
  {
    id: '11',
    roleId: '2',
    parentId: '9',
    members: [
      { id: '11-CXKUBbf1MCNEZ0IADdLa', memberId: 'CXKUBbf1MCNEZ0IADdLa' },
    ],
  },
]
