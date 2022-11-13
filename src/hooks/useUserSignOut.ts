import { useSignOut } from '@nhost/react'
import { useCallback } from 'react'
import { resetUserLocalStorage } from 'src/utils'

export default function useUserSignOut() {
  const { signOut } = useSignOut()
  return useCallback(() => {
    signOut()
    resetUserLocalStorage()
  }, [])
}
