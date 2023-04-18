import Page404 from '@pages/Page404'
import { useStoreState } from '@store/hooks'
import { useParams } from 'react-router-dom'
import OrgRoute from './OrgRoute'

type Params = {
  slug: string
}

export default function OrgSlugRoute() {
  const { slug } = useParams<Params>()
  const orgs = useStoreState((state) => state.orgs.entries)
  const orgId = orgs?.find((org) => org.slug === slug)?.id

  // Loading
  if (!orgs) return null

  return orgId ? <OrgRoute orgId={orgId} /> : <Page404 />
}
