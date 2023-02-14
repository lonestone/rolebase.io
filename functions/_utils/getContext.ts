import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export type UserHasuraClaims = {
  'x-hasura-user-id': string
  'x-hasura-default-role': string
  'x-hasura-allowed-roles': string[]
} & {
  [key: string]: string // had to add this here to avoide adding `| string[]` at the end here.
}

export type FunctionContext = {
  req: Request
  res: Response
  isAuthenticated: boolean
  isAdmin: boolean
  userId?: string
  userClaims?: UserHasuraClaims
}

export function getContext(req: Request, res: Response): FunctionContext {
  // User
  const userClaims = getUserClaims(req)

  // Admin
  const isAdmin =
    userClaims?.['x-hasura-allowed-roles'].includes('admin') || false

  // return
  return {
    req,
    res,
    isAuthenticated: !!userClaims,
    isAdmin,
    userId: userClaims?.['x-hasura-user-id'],
    userClaims,
  }
}

export const getUserClaims = (req: Request): UserHasuraClaims | undefined => {
  try {
    const authorizationHeader = req.headers['authorization']
    const accessToken = authorizationHeader?.split(' ')[1]

    if (!accessToken) {
      return undefined
    }

    if (!process.env.NHOST_JWT_SECRET) {
      throw new Error('NHOST_JWT_SECRET env var is not set')
    }

    const jwtSecret = JSON.parse(process.env.NHOST_JWT_SECRET)
    const decodedToken = jwt.verify(accessToken, jwtSecret.key) as any
    return decodedToken['https://hasura.io/jwt/claims'] as UserHasuraClaims
  } catch (error) {
    return undefined
  }
}
