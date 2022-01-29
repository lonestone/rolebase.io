import ConfirmResetPasswordPage from '@components/pages/ConfirmResetPasswordPage'
import LoginPage from '@components/pages/LoginPage'
import ResetPasswordPage from '@components/pages/ResetPasswordPage'
import SignupPage from '@components/pages/SignupPage'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export default function PublicRoutes() {
  return (
    <Switch>
      <Route exact path="/signup">
        <SignupPage />
      </Route>
      <Route exact path="/reset-password">
        <ResetPasswordPage />
      </Route>
      <Route exact path="/reset-password/confirm">
        <ConfirmResetPasswordPage />
      </Route>
      <Route>
        <LoginPage />
      </Route>
    </Switch>
  )
}
