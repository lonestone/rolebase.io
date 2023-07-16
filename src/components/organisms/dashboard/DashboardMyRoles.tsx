import useCurrentMember from '@hooks/useCurrentMember'
import DashboardMyInfosItem from '@molecules/dashboard/DashboardMyInfosItem'
import MemberRoles from '@molecules/member/MemberRoles'
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
      <MemberRoles member={member} mx={-2} mt={2} mb={-4} />
    </DashboardMyInfosItem>
  )
}
