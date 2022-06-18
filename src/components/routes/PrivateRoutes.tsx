import MemberInvitationPage from '@components/pages/MemberInvitationPage'
import OrgsPage from '@components/pages/OrgsPage'
import Page404 from '@components/pages/Page404'
import SuperAdminPage from '@components/pages/SuperAdminPage'
import useSuperAdmin from '@hooks/useSuperAdmin'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LoggedLayout from './LoggedLayout'
import OrgRoutes from './OrgRoutes'

export default function PrivateRoutes() {
  const superAdmin = useSuperAdmin()

  return (
    <LoggedLayout>
      <Switch>
        <Route exact path="/">
          <OrgsPage />
        </Route>
        <Route exact path="/orgs/:orgId/invitation">
          <MemberInvitationPage />
        </Route>
        <Route exact path="/login">
          <Redirect to="/" />
        </Route>
        <Route exact path="/signup">
          <Redirect to="/" />
        </Route>
        <Route path="/orgs/:orgId">
          <OrgRoutes />
        </Route>
        {superAdmin && (
          <Route exact path="/admin">
            <SuperAdminPage />
          </Route>
        )}
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </LoggedLayout>
  )
}
