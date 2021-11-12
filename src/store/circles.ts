import { subscribeCircles } from '@api/entities/circles'
import { CircleEntry } from '@shared/circle'
import { createModel } from './generic'

export default createModel<CircleEntry>(subscribeCircles)
