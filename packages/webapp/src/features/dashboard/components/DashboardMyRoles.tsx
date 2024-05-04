import DashboardMyInfosItem from '@/dashboard/components/DashboardMyInfosItem'
import MemberRoles from '@/member/components/MemberRoles'
import useCurrentMember from '@/member/hooks/useCurrentMember'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function DashboardMyRoles() {
  const { t } = useTranslation()
  const member = useCurrentMember()

  if (!member) return null

  return (
    <DashboardMyInfosItem
      title={t('DashboardMyRoles.title')}
      path={`roles?memberId=${member.id}`}
    >
      <MemberRoles member={member} iconRightArrow mx={-2} mt={2} mb={-4} />
    </DashboardMyInfosItem>
  )
}
