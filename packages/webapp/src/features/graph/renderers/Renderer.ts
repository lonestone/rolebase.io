import { Graph } from '../graphs/Graph'

export default abstract class Renderer {
  constructor(public graph: Graph) {}

  destroy() {
    // @ts-ignore
    this.graph = true
  }
}
