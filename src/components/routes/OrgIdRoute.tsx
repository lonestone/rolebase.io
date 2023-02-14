import React from 'react'
import { useParams } from 'react-router-dom'
import OrgRoutes from './OrgRoutes'

type Params = {
  orgId: string
}

export default function OrgIdRoute() {
  const { orgId } = useParams<Params>()
  return orgId ? <OrgRoutes orgId={orgId} /> : null
}
