import { useSignOut } from '@nhost/react'
import { resetUserLocalStorage } from '@utils/localStorage'
import { useCallback } from 'react'

export default function useUserSignOut() {
  const { signOut } = useSignOut()
  return useCallback(() => {
    signOut()
    resetUserLocalStorage()
  }, [])
}
