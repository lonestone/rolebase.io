import { Graph } from '../graphs/Graph'
import { MoveTransition } from '../helpers/createTransition'
import { NodesSelection } from '../types'

export abstract class AbstractCircleElement {
  constructor(protected graph: Graph) {}

  abstract enter(selection: NodesSelection, transition: MoveTransition): void
  abstract update(selection: NodesSelection, transition: MoveTransition): void
  abstract exit(selection: NodesSelection, transition: MoveTransition): void
}
