export interface User {
  name: string
  email: string
  picture?: string
}

export type UserEntry = User & { id: string }
export type UserCreate = User
export type UserUpdate = Partial<User>
