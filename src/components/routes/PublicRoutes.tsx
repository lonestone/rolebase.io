import LoginPage from '@components/pages/LoginPage'
import SignupPage from '@components/pages/SignupPage'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export default function PublicRoutes() {
  return (
    <Switch>
      <Route exact path="/signup">
        <SignupPage />
      </Route>
      <Route>
        <LoginPage />
      </Route>
    </Switch>
  )
}
