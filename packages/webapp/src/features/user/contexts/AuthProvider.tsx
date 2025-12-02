import { type Session } from '@nhost/nhost-js/auth'
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { nhost } from 'src/nhost'

export interface AuthContextType {
  user: Session['user'] | null
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Session['user'] | null>(null)

  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    const currentSession = nhost.getUserSession()
    setUser(currentSession?.user || null)
    setSession(currentSession)
    setIsAuthenticated(!!currentSession)
    setIsLoading(false)

    const unsubscribe = nhost.sessionStorage.onChange((currentSession) => {
      setUser(currentSession?.user || null)
      setSession(currentSession)
      setIsAuthenticated(!!currentSession)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // Refresh token when receiving query param "refreshToken" (reset password)
  useEffect(() => {
    const refreshToken = new URLSearchParams(window.location.search).get(
      'refreshToken'
    )
    if (refreshToken) {
      nhost.auth.refreshToken({ refreshToken })
    }
  }, [])

  const value: AuthContextType = {
    user,
    session,
    isAuthenticated,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
