import Homepage from '@/common/pages/Homepage'
import AuthPage from '@/user/pages/AuthPage'
import ResetPasswordPage from '@/user/pages/ResetPasswordPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export default function PublicRoute() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  )
}
