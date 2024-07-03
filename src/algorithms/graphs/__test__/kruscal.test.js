import Graph from '../../../data-structures/graph/index'
import GraphNode from '../../../data-structures/graph/node'
import GraphEdge from '../../../data-structures/graph/edge'
import kruskal from '../kruskal'

describe('kruskal', () => {
  it('should fire an error for directed graph', () => {
    function applyPrimToDirectedGraph() {
      const graph = new Graph(true)

      kruskal(graph)
    }

    expect(applyPrimToDirectedGraph).toThrowError()
  })

  it('should find minimum spanning tree', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')
    const nodeG = new GraphNode('G')

    const edgeAB = new GraphEdge(nodeA, nodeB, 2)
    const edgeAD = new GraphEdge(nodeA, nodeD, 3)
    const edgeAC = new GraphEdge(nodeA, nodeC, 3)
    const edgeBC = new GraphEdge(nodeB, nodeC, 4)
    const edgeBE = new GraphEdge(nodeB, nodeE, 3)
    const edgeDF = new GraphEdge(nodeD, nodeF, 7)
    const edgeEC = new GraphEdge(nodeE, nodeC, 1)
    const edgeEF = new GraphEdge(nodeE, nodeF, 8)
    const edgeFG = new GraphEdge(nodeF, nodeG, 9)
    const edgeFC = new GraphEdge(nodeF, nodeC, 6)

    const graph = new Graph()

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAD)
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeBE)
      .addEdge(edgeDF)
      .addEdge(edgeEC)
      .addEdge(edgeEF)
      .addEdge(edgeFC)
      .addEdge(edgeFG)

    expect(graph.getWeight()).toEqual(46)

    const minimumSpanningTree = kruskal(graph)

    expect(minimumSpanningTree.getWeight()).toBe(24)
    expect(minimumSpanningTree.getAllNodes().length).toBe(
      graph.getAllNodes().length,
    )
    expect(minimumSpanningTree.getAllEdges().length).toBe(
      graph.getAllNodes().length - 1,
    )
    expect(minimumSpanningTree.toString()).toBe('E,C,A,B,D,F,G')
  })

  it('should find minimum spanning tree for simple graph', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')

    const edgeAB = new GraphEdge(nodeA, nodeB, 1)
    const edgeAD = new GraphEdge(nodeA, nodeD, 3)
    const edgeBC = new GraphEdge(nodeB, nodeC, 1)
    const edgeBD = new GraphEdge(nodeB, nodeD, 3)
    const edgeCD = new GraphEdge(nodeC, nodeD, 1)

    const graph = new Graph()

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAD)
      .addEdge(edgeBC)
      .addEdge(edgeBD)
      .addEdge(edgeCD)

    expect(graph.getWeight()).toEqual(9)

    const minimumSpanningTree = kruskal(graph)

    expect(minimumSpanningTree.getWeight()).toBe(3)
    expect(minimumSpanningTree.getAllNodes().length).toBe(
      graph.getAllNodes().length,
    )
    expect(minimumSpanningTree.getAllEdges().length).toBe(
      graph.getAllNodes().length - 1,
    )
    expect(minimumSpanningTree.toString()).toBe('A,B,C,D')
  })
})
