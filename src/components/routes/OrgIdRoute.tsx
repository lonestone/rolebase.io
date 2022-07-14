import React from 'react'
import { useParams } from 'react-router-dom'
import OrgRoutes from './OrgRoutes'

export default function OrgIdRoute() {
  const { orgId } = useParams<{ orgId: string }>()
  return <OrgRoutes orgId={orgId} />
}
