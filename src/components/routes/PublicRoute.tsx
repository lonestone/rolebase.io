import AuthPage from '@pages/AuthPage'
import Homepage from '@pages/Homepage'
import ResetPasswordPage from '@pages/ResetPasswordPage'
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
