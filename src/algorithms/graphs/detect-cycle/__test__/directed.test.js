import Graph from '../../../../data-structures/graph/index'
import GraphNode from '../../../../data-structures/graph/node'
import GraphEdge from '../../../../data-structures/graph/edge'
import detectDirectedCycle from '../directed'

describe('detectDirectedCycle', () => {
  it('должен обнаруживать направленный цикл', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeAC = new GraphEdge(nodeA, nodeC)
    const edgeDA = new GraphEdge(nodeD, nodeA)
    const edgeDE = new GraphEdge(nodeD, nodeE)
    const edgeEF = new GraphEdge(nodeE, nodeF)
    const edgeFD = new GraphEdge(nodeF, nodeD)

    const graph = new Graph(true)
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeAC)
      .addEdge(edgeDA)
      .addEdge(edgeDE)
      .addEdge(edgeEF)

    expect(detectDirectedCycle(graph)).toBeNull()

    graph.addEdge(edgeFD)

    expect(detectDirectedCycle(graph)).toEqual({
      D: nodeF,
      F: nodeE,
      E: nodeD,
    })
  })
})
