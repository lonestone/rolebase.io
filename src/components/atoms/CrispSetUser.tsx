import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useUserData } from '@nhost/react'
import { useEffect } from 'react'

export default function CrispSetUser() {
  const user = useUserData()
  const member = useCurrentMember()
  const org = useCurrentOrg()

  const email = user?.email
  const nickname = member?.name || user?.displayName
  const avatar = member?.picture || user?.avatarUrl

  const $crisp = (window as any).$crisp
  if (!$crisp) {
    console.error('Crisp not found')
  }

  useEffect(() => {
    if (!email || !$crisp) return
    $crisp.push(['set', 'user:email', [email]])
  }, [email])

  useEffect(() => {
    if (!nickname || !$crisp) return
    $crisp.push(['set', 'user:nickname', [nickname]])
  }, [nickname])

  useEffect(() => {
    if (!avatar || !$crisp) return
    $crisp.push(['set', 'user:avatar', [avatar]])
  }, [avatar])

  useEffect(() => {
    if (!org || !$crisp) return
    $crisp.push(['set', 'user:company', [org.name]])
  }, [org?.name])

  return null
}
