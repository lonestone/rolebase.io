import { CirclesGraph } from '../graphs/CirclesGraph'

export default abstract class Renderer {
  constructor(public graph: CirclesGraph) {}

  destroy() {
    // @ts-ignore
    this.graph = true
  }
}
