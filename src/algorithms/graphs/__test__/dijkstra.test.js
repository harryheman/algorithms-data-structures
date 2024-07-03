import Graph from '../../../data-structures/graph/index'
import GraphNode from '../../../data-structures/graph/node'
import GraphEdge from '../../../data-structures/graph/edge'
import dijkstra from '../dijkstra'

describe('dijkstra', () => {
  it('должен находить минимальные пути всех вершин ненаправленного графа', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')
    const nodeG = new GraphNode('G')
    const nodeH = new GraphNode('H')

    const edgeAB = new GraphEdge(nodeA, nodeB, 4)
    const edgeAE = new GraphEdge(nodeA, nodeE, 7)
    const edgeAC = new GraphEdge(nodeA, nodeC, 3)
    const edgeBC = new GraphEdge(nodeB, nodeC, 6)
    const edgeBD = new GraphEdge(nodeB, nodeD, 5)
    const edgeEC = new GraphEdge(nodeE, nodeC, 8)
    const edgeED = new GraphEdge(nodeE, nodeD, 2)
    const edgeDC = new GraphEdge(nodeD, nodeC, 11)
    const edgeDG = new GraphEdge(nodeD, nodeG, 10)
    const edgeDF = new GraphEdge(nodeD, nodeF, 2)
    const edgeFG = new GraphEdge(nodeF, nodeG, 3)
    const edgeEG = new GraphEdge(nodeE, nodeG, 5)

    const graph = new Graph()
    graph
      .addNode(nodeH)
      .addEdge(edgeAB)
      .addEdge(edgeAE)
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeBD)
      .addEdge(edgeEC)
      .addEdge(edgeED)
      .addEdge(edgeDC)
      .addEdge(edgeDG)
      .addEdge(edgeDF)
      .addEdge(edgeFG)
      .addEdge(edgeEG)

    const { distances, previous } = dijkstra(graph, nodeA)

    expect(distances).toEqual({
      H: Infinity,
      A: 0,
      B: 4,
      E: 7,
      C: 3,
      D: 9,
      G: 12,
      F: 11,
    })

    expect(previous.F.getKey()).toBe('D')
    expect(previous.D.getKey()).toBe('B')
    expect(previous.B.getKey()).toBe('A')
    expect(previous.G.getKey()).toBe('E')
    expect(previous.C.getKey()).toBe('A')
    expect(previous.A).toBeNull()
    expect(previous.H).toBeNull()
  })

  it('должен находить минимальные пути всех вершин направленного графа с отрицательными весами ребер', () => {
    const nodeS = new GraphNode('S')
    const nodeE = new GraphNode('E')
    const nodeA = new GraphNode('A')
    const nodeD = new GraphNode('D')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeH = new GraphNode('H')

    const edgeSE = new GraphEdge(nodeS, nodeE, 8)
    const edgeSA = new GraphEdge(nodeS, nodeA, 10)
    const edgeED = new GraphEdge(nodeE, nodeD, 1)
    const edgeDA = new GraphEdge(nodeD, nodeA, -4)
    const edgeDC = new GraphEdge(nodeD, nodeC, -1)
    const edgeAC = new GraphEdge(nodeA, nodeC, 2)
    const edgeCB = new GraphEdge(nodeC, nodeB, -2)
    const edgeBA = new GraphEdge(nodeB, nodeA, 1)

    const graph = new Graph(true)
    graph
      .addNode(nodeH)
      .addEdge(edgeSE)
      .addEdge(edgeSA)
      .addEdge(edgeED)
      .addEdge(edgeDA)
      .addEdge(edgeDC)
      .addEdge(edgeAC)
      .addEdge(edgeCB)
      .addEdge(edgeBA)

    const { distances, previous } = dijkstra(graph, nodeS)

    expect(distances).toEqual({
      H: Infinity,
      S: 0,
      A: 5,
      B: 5,
      C: 7,
      D: 9,
      E: 8,
    })

    expect(previous.H).toBeNull()
    expect(previous.S).toBeNull()
    expect(previous.B.getKey()).toBe('C')
    expect(previous.C.getKey()).toBe('A')
    expect(previous.A.getKey()).toBe('D')
    expect(previous.D.getKey()).toBe('E')
  })
})
