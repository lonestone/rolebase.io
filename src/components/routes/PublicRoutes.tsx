import Homepage from '@components/pages/Homepage'
import LoginPage from '@components/pages/LoginPage'
import ResetPasswordPage from '@components/pages/ResetPasswordPage'
import SignupPage from '@components/pages/SignupPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}
