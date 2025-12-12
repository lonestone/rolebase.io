import { useEffect, useState } from 'react'
import { trpc } from 'src/trpc'

interface UseMemberInvitationInfoParams {
  memberId: string | undefined
  token: string | undefined
}

interface MemberInvitationInfo {
  orgName: string
  email: string | null
}

export function useMemberInvitationInfo({
  memberId,
  token,
}: UseMemberInvitationInfoParams) {
  const [data, setData] = useState<MemberInvitationInfo | undefined>(undefined)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!memberId || !token) {
      setLoading(false)
      return
    }

    setLoading(true)
    trpc.member.getMemberInvitationInfo
      .query({ memberId, token })
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setError(true)
        setLoading(false)
      })
  }, [memberId, token])

  return { data, error, loading }
}
