interface MemberState {
  selected: boolean
  emailAuto: boolean
  email: string
}

interface MembersState {
  [id: string]: MemberState | undefined
}

type Action =
  | {
      type: 'Toggle'
      id: string
    }
  | {
      type: 'SetEmail'
      id: string
      email: string
      emailAuto?: boolean
    }

export function memberInviteReducer(state: MembersState, action: Action) {
  const member: MemberState = state[action.id] || {
    selected: false,
    emailAuto: false,
    email: '',
  }
  switch (action.type) {
    case 'Toggle':
      // Toggle member selection
      return {
        ...state,
        [action.id]: { ...member, selected: !member.selected },
      }
    case 'SetEmail':
      // Update member's email
      return {
        ...state,
        [action.id]: {
          ...member,
          email: action.email,
          emailAuto: action.emailAuto || false,
        },
      }
    default:
      throw new Error()
  }
}

export function guessEmailPattern(
  email: string,
  name: string
): string | undefined {
  if (!isEmail(email)) return undefined
  const nameParts = getNameParts(name)
  const emailPattern = nameParts.reduce(
    (pattern, part, i) => pattern.replace(part, `{${i}}`),
    email
  )
  return emailPattern === email ? undefined : emailPattern
}

export function getEmailFromName(
  name: string,
  emailPattern: string
): string | undefined {
  const nameParts = getNameParts(name)
  const email = nameParts.reduce(
    (email, part, i) => email.replace(`{${i}}`, part),
    emailPattern
  )
  return email.indexOf('{') !== -1 ? undefined : email
}

function removeAccent(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function getNameParts(name: string): string[] {
  return removeAccent(name).toLowerCase().trim().split(' ')
}

function isEmail(email: string) {
  return /^[^@]+@[^@]+/.test(email)
}
