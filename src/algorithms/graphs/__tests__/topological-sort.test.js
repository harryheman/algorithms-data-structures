import Graph from '../../../data-structures/graph/index'
import GraphNode from '../../../data-structures/graph/node'
import GraphEdge from '../../../data-structures/graph/edge'
import topologicalSort from '../topological-sort'

describe('topologicalSort', () => {
  it('should do topological sorting on graph', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')
    const nodeG = new GraphNode('G')
    const nodeH = new GraphNode('H')

    const edgeAC = new GraphEdge(nodeA, nodeC)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeBD = new GraphEdge(nodeB, nodeD)
    const edgeCE = new GraphEdge(nodeC, nodeE)
    const edgeDF = new GraphEdge(nodeD, nodeF)
    const edgeEF = new GraphEdge(nodeE, nodeF)
    const edgeEH = new GraphEdge(nodeE, nodeH)
    const edgeFG = new GraphEdge(nodeF, nodeG)

    const graph = new Graph(true)

    graph
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeBD)
      .addEdge(edgeCE)
      .addEdge(edgeDF)
      .addEdge(edgeEF)
      .addEdge(edgeEH)
      .addEdge(edgeFG)

    const sortedVertices = topologicalSort(graph)

    expect(sortedVertices).toBeDefined()
    expect(sortedVertices.length).toBe(graph.getAllNodes().length)
    expect(sortedVertices).toEqual([
      nodeB,
      nodeD,
      nodeA,
      nodeC,
      nodeE,
      nodeH,
      nodeF,
      nodeG,
    ])
  })
})
