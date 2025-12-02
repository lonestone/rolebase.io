import { useAuth } from './useAuth'

export default function useSuperAdmin(): boolean {
  const { user } = useAuth()
  return user?.roles.includes('admin') ?? false
}
