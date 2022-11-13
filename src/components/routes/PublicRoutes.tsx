import Homepage from '@components/pages/Homepage'
import LoginPage from '@components/pages/LoginPage'
import ResetPasswordPage from '@components/pages/ResetPasswordPage'
import SignupPage from '@components/pages/SignupPage'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export default function PublicRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/signup">
        <SignupPage />
      </Route>
      <Route exact path="/reset-password">
        <ResetPasswordPage />
      </Route>
      <Route>
        <LoginPage />
      </Route>
    </Switch>
  )
}
