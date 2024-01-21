import { CircleFullFragment, OrgFragment } from '@gql'
import { createModel } from '../../../store/generic'

export type OrgWithCircle = OrgFragment & {
  circles: CircleFullFragment[]
}

export default createModel<OrgWithCircle>()
