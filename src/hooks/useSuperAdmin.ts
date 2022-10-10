import { useUserRoles } from '@nhost/react'

export default function useSuperAdmin(): boolean {
  const roles = useUserRoles()
  return roles.includes('admin')
}
