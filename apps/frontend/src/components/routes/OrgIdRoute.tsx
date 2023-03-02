import React from 'react'
import { useParams } from 'react-router-dom'
import OrgRoute from './OrgRoute'

type Params = {
  orgId: string
}

export default function OrgIdRoute() {
  const { orgId } = useParams<Params>()
  return orgId ? <OrgRoute orgId={orgId} /> : null
}
