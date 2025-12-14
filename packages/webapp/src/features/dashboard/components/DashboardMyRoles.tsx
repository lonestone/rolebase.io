import DashboardMyInfosItem from '@/dashboard/components/DashboardMyInfosItem'
import MemberRoles from '@/member/components/MemberRoles'
import useCurrentMember from '@/member/hooks/useCurrentMember'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function DashboardMyRoles() {
  const { t } = useTranslation()
  const member = useCurrentMember()
  const circles = useStoreState((state) => state.org.circles)

  if (!member || circles?.length === 1) return null

  return (
    <DashboardMyInfosItem
      title={t('DashboardMyRoles.title')}
      path={`roles?memberId=${member.id}`}
    >
      <MemberRoles member={member} hideActions mx={1} mt={4} />
    </DashboardMyInfosItem>
  )
}
