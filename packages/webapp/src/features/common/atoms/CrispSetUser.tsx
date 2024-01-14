import useCurrentMember from '@/member/hooks/useCurrentMember'
import useCurrentOrg from '@/org/hooks/useCurrentOrg'
import { useUserData } from '@nhost/react'
import { Crisp } from 'crisp-sdk-web'
import { useEffect } from 'react'
import { AVATAR_SM_WIDTH, getResizedImageUrl } from '../api/storage_images'

export default function CrispSetUser() {
  const user = useUserData()
  const member = useCurrentMember()
  const org = useCurrentOrg()

  const email = user?.email
  const nickname = member?.name || user?.displayName
  const avatar =
    getResizedImageUrl(member?.picture, AVATAR_SM_WIDTH) || user?.avatarUrl

  useEffect(() => {
    if (!email) return
    Crisp.user.setEmail(email)
  }, [email])

  useEffect(() => {
    if (!nickname) return
    Crisp.user.setNickname(nickname)
  }, [nickname])

  useEffect(() => {
    if (!avatar) return
    Crisp.user.setAvatar(avatar)
  }, [avatar])

  useEffect(() => {
    if (!org) return
    Crisp.user.setCompany(org.name, {})
  }, [org?.name])

  return null
}
