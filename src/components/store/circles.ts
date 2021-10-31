import { CircleEntry } from '@shared/circles'
import { subscribeCircles } from '../../api/entities/circles'
import { createModel } from './generic'

export default createModel<CircleEntry>(subscribeCircles)
