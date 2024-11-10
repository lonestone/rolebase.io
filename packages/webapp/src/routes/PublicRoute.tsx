import Homepage from '@/common/pages/Homepage'
import LoginPage from '@/user/pages/LoginPage'
import ResetPasswordPage from '@/user/pages/ResetPasswordPage'
import SignupPage from '@/user/pages/SignupPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export default function PublicRoute() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}
