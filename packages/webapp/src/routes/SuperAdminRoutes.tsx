import SuperAdminLayout from '@/superAdmin/components/SuperAdminLayout'
import AdminDashboardPage from '@/superAdmin/pages/AdminDashboardPage'
import AdminMaintenancePage from '@/superAdmin/pages/AdminMaintenancePage'
import AdminOrgsPage from '@/superAdmin/pages/AdminOrgsPage'
import AdminUsersPage from '@/superAdmin/pages/AdminUsersPage'
import React from 'react'
import { Route } from 'react-router-dom'

export default function SuperAdminRoutes() {
  return (
    <Route path="admin" element={<SuperAdminLayout />}>
      <Route index element={<AdminDashboardPage />} />
      <Route path="orgs" element={<AdminOrgsPage />} />
      <Route path="users" element={<AdminUsersPage />} />
      <Route path="maintenance" element={<AdminMaintenancePage />} />
    </Route>
  )
}
