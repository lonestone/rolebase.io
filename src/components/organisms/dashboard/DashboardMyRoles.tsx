import React from 'react'
import DashboardMyInfosItem from '@molecules/dashboard/DashboardMyInfosItem'
import { useTranslation } from 'react-i18next'
import { MemberFragment } from '@gql'
import MemberRoles from '@molecules/member/MemberRoles'

export type DashboardMyRolesProps = {
  path: string
  member: MemberFragment
}

const DashboardMyRoles = ({ path, member }: DashboardMyRolesProps) => {
  const { t } = useTranslation()

  return (
    <DashboardMyInfosItem title={t('DashboardMyRoles.title')} path={path}>
      <MemberRoles member={member} />
    </DashboardMyInfosItem>
  )
}

export default DashboardMyRoles
