import { subscribeCircles } from '@api/entities/circles'
import { createModel } from './generic'

export default createModel((orgId: string) => subscribeCircles(orgId, false))
