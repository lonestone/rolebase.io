import { resetUserLocalStorage } from '@utils/localStorage'
import { useCallback } from 'react'
import { nhost } from 'src/nhost'

export default function useUserSignOut() {
  return useCallback(() => {
    nhost.auth.signOut({})
    resetUserLocalStorage()
  }, [])
}
