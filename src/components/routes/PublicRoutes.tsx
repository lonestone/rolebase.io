import Homepage from '@pages/Homepage'
import LoginPage from '@pages/LoginPage'
import ResetPasswordPage from '@pages/ResetPasswordPage'
import SignupPage from '@pages/SignupPage'
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
