import useSuperAdmin from '@hooks/useSuperAdmin'
import MemberInvitationPage from '@pages/MemberInvitationPage'
import OrgsPage from '@pages/OrgsPage'
import Page404 from '@pages/Page404'
import SuperAdminPage from '@pages/SuperAdminPage'
import UserInfoPage from '@pages/UserInfoPage'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoggedLayout from '../molecules/LoggedLayout'
import OrgIdRoute from './OrgIdRoute'
import OrgSlugRoute from './OrgSlugRoute'

export default function PrivateRoutes() {
  const superAdmin = useSuperAdmin()

  return (
    <LoggedLayout>
      <Routes>
        <Route index element={<OrgsPage />} />
        <Route
          path="orgs/:orgId/invitation"
          element={<MemberInvitationPage />}
        />
        <Route path="user-info" element={<UserInfoPage />} />

        <Route path="login" element={<Navigate to="/" />} />
        <Route path="reset-password" element={<Navigate to="/" />} />
        <Route path="signup" element={<Navigate to="/" />} />

        <Route path="orgs/:orgId/*" element={<OrgIdRoute />} />
        <Route path=":slug/*" element={<OrgSlugRoute />} />

        {superAdmin && <Route path="admin" element={<SuperAdminPage />} />}

        <Route path="*" element={<Page404 />} />
      </Routes>
    </LoggedLayout>
  )
}
