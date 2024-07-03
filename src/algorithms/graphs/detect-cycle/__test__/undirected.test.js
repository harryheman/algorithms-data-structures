import Graph from '../../../../data-structures/graph/index'
import GraphNode from '../../../../data-structures/graph/node'
import GraphEdge from '../../../../data-structures/graph/edge'
import detectUndirectedCycle from '../undirected'

describe('detectUndirectedCycle', () => {
  it('должен обнаруживать ненаправленный цикл', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')

    const edgeAF = new GraphEdge(nodeA, nodeF)
    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBE = new GraphEdge(nodeB, nodeE)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeCD = new GraphEdge(nodeC, nodeD)
    const edgeDE = new GraphEdge(nodeD, nodeE)

    const graph = new Graph()
    graph
      .addEdge(edgeAF)
      .addEdge(edgeAB)
      .addEdge(edgeBE)
      .addEdge(edgeBC)
      .addEdge(edgeCD)

    expect(detectUndirectedCycle(graph)).toBeNull()

    graph.addEdge(edgeDE)

    expect(detectUndirectedCycle(graph)).toEqual({
      B: nodeC,
      C: nodeD,
      D: nodeE,
      E: nodeB,
    })
  })
})
