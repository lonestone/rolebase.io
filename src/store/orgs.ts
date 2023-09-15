import { CircleFullFragment, OrgFragment } from '@gql'
import { createModel } from './generic'

export type OrgWithCircle = OrgFragment & {
  circles: CircleFullFragment[]
}

export default createModel<OrgWithCircle>()
