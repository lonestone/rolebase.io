import Page404 from '@components/pages/Page404'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useParams } from 'react-router-dom'
import OrgRoutes from './OrgRoutes'

type Params = {
  slug: string
}

export default function OrgSlugRoute() {
  const { slug } = useParams<Params>()
  const orgs = useStoreState((state) => state.orgs.entries)
  const orgId = orgs?.find((org) => org.slug === slug)?.id

  // Loading
  if (!orgs) return null

  return orgId ? <OrgRoutes orgId={orgId} /> : <Page404 />
}
