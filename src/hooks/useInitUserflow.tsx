import { useUserData } from '@nhost/react'
import { useEffect } from 'react'
import settings from 'src/settings'
import userflow from 'userflow.js'

export default function useInitUserflow() {
  const user = useUserData()

  useEffect(() => {
    if (!user) return

    // Start Userflow and identifiy user
    userflow.init(settings.userflow.token)
    userflow.identify(user.id, {
      name: user.displayName,
      email: user.email,
      signed_up_at: user.createdAt,
    })
    userflow.setResourceCenterLauncherHidden(true)

    // Reset Userflow on unmount
    return () => userflow.reset()
  }, [])
}
