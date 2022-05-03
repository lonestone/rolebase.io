import MemberInvitationPage from '@components/pages/MemberInvitationPage'
import OrgsPage from '@components/pages/OrgsPage'
import Page404 from '@components/pages/Page404'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoggedLayout from './LoggedLayout'
import OrgRoutes from './OrgRoutes'

export default function PrivateRoutes() {
  return (
    <LoggedLayout>
      <Switch>
        <Route exact path="/">
          <OrgsPage />
        </Route>
        <Route exact path="/orgs/:orgId/invitation">
          <MemberInvitationPage />
        </Route>
        <Route path="/orgs/:orgId">
          <OrgRoutes />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </LoggedLayout>
  )
}
