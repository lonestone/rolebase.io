import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

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
