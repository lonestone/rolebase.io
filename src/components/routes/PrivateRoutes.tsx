import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LoggedLayout from '../layout/LoggedLayout'
import OrgsPage from '../pages/OrgsPage'
import OrgRoutes from './OrgRoutes'

export default function PrivateRoutes() {
  return (
    <LoggedLayout>
      <Switch>
        <Route exact path="/">
          <OrgsPage />
        </Route>
        <Route path="/orgs/:orgId">
          <OrgRoutes />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </LoggedLayout>
  )
}
