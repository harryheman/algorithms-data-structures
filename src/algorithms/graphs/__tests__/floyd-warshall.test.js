import Graph from '../../../data-structures/graph/index'
import GraphEdge from '../../../data-structures/graph/edge'
import GraphNode from '../../../data-structures/graph/node'
import floydWarshall from '../floyd-warshall'

describe('floydWarshall', () => {
  it('должен найти минимальные пути для всех вершин ненаправленного графа', () => {
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

    // Сначала добавляем вершины в правильном порядке
    graph
      .addNode(nodeA)
      .addNode(nodeB)
      .addNode(nodeC)
      .addNode(nodeD)
      .addNode(nodeE)
      .addNode(nodeF)
      .addNode(nodeG)
      .addNode(nodeH)

    // Теперь добавляем ребра
    graph
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

    const { distances, nextVertices } = floydWarshall(graph)

    const vertices = graph.getAllNodes()

    const nodeAIndex = vertices.indexOf(nodeA)
    const nodeBIndex = vertices.indexOf(nodeB)
    const nodeCIndex = vertices.indexOf(nodeC)
    const nodeDIndex = vertices.indexOf(nodeD)
    const nodeEIndex = vertices.indexOf(nodeE)
    const nodeFIndex = vertices.indexOf(nodeF)
    const nodeGIndex = vertices.indexOf(nodeG)
    const nodeHIndex = vertices.indexOf(nodeH)

    expect(distances[nodeAIndex][nodeHIndex]).toBe(Infinity)
    expect(distances[nodeAIndex][nodeAIndex]).toBe(0)
    expect(distances[nodeAIndex][nodeBIndex]).toBe(4)
    expect(distances[nodeAIndex][nodeEIndex]).toBe(7)
    expect(distances[nodeAIndex][nodeCIndex]).toBe(3)
    expect(distances[nodeAIndex][nodeDIndex]).toBe(9)
    expect(distances[nodeAIndex][nodeGIndex]).toBe(12)
    expect(distances[nodeAIndex][nodeFIndex]).toBe(11)

    expect(nextVertices[nodeAIndex][nodeFIndex]).toBe(nodeD)
    expect(nextVertices[nodeAIndex][nodeDIndex]).toBe(nodeB)
    expect(nextVertices[nodeAIndex][nodeBIndex]).toBe(nodeA)
    expect(nextVertices[nodeAIndex][nodeGIndex]).toBe(nodeE)
    expect(nextVertices[nodeAIndex][nodeCIndex]).toBe(nodeA)
    expect(nextVertices[nodeAIndex][nodeAIndex]).toBe(null)
    expect(nextVertices[nodeAIndex][nodeHIndex]).toBe(null)
  })

  it('должен найти минимальные пути для всех вершин направленного графа', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')

    const edgeAB = new GraphEdge(nodeA, nodeB, 3)
    const edgeBA = new GraphEdge(nodeB, nodeA, 8)
    const edgeAD = new GraphEdge(nodeA, nodeD, 7)
    const edgeDA = new GraphEdge(nodeD, nodeA, 2)
    const edgeBC = new GraphEdge(nodeB, nodeC, 2)
    const edgeCA = new GraphEdge(nodeC, nodeA, 5)
    const edgeCD = new GraphEdge(nodeC, nodeD, 1)

    const graph = new Graph(true)

    graph.addNode(nodeA).addNode(nodeB).addNode(nodeC).addNode(nodeD)

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBA)
      .addEdge(edgeAD)
      .addEdge(edgeDA)
      .addEdge(edgeBC)
      .addEdge(edgeCA)
      .addEdge(edgeCD)

    const { distances, nextVertices } = floydWarshall(graph)

    const vertices = graph.getAllNodes()

    const nodeAIndex = vertices.indexOf(nodeA)
    const nodeBIndex = vertices.indexOf(nodeB)
    const nodeCIndex = vertices.indexOf(nodeC)
    const nodeDIndex = vertices.indexOf(nodeD)

    expect(distances[nodeAIndex][nodeAIndex]).toBe(0)
    expect(distances[nodeAIndex][nodeBIndex]).toBe(3)
    expect(distances[nodeAIndex][nodeCIndex]).toBe(5)
    expect(distances[nodeAIndex][nodeDIndex]).toBe(6)

    expect(distances).toEqual([
      [0, 3, 5, 6],
      [5, 0, 2, 3],
      [3, 6, 0, 1],
      [2, 5, 7, 0],
    ])

    expect(nextVertices[nodeAIndex][nodeDIndex]).toBe(nodeC)
    expect(nextVertices[nodeAIndex][nodeCIndex]).toBe(nodeB)
    expect(nextVertices[nodeBIndex][nodeDIndex]).toBe(nodeC)
    expect(nextVertices[nodeAIndex][nodeAIndex]).toBe(null)
    expect(nextVertices[nodeAIndex][nodeBIndex]).toBe(nodeA)
  })

  it('должен найти минимальные пути для всех вершин направленного графа с отрицательными весами ребер', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')
    const nodeG = new GraphNode('G')

    const edgeFE = new GraphEdge(nodeF, nodeE, 8)
    const edgeFA = new GraphEdge(nodeF, nodeA, 10)
    const edgeED = new GraphEdge(nodeE, nodeD, 1)
    const edgeDA = new GraphEdge(nodeD, nodeA, -4)
    const edgeDC = new GraphEdge(nodeD, nodeC, -1)
    const edgeAC = new GraphEdge(nodeA, nodeC, 2)
    const edgeCB = new GraphEdge(nodeC, nodeB, -2)
    const edgeBA = new GraphEdge(nodeB, nodeA, 1)

    const graph = new Graph(true)

    graph
      .addNode(nodeA)
      .addNode(nodeB)
      .addNode(nodeC)
      .addNode(nodeD)
      .addNode(nodeE)
      .addNode(nodeF)
      .addNode(nodeG)

    graph
      .addEdge(edgeFE)
      .addEdge(edgeFA)
      .addEdge(edgeED)
      .addEdge(edgeDA)
      .addEdge(edgeDC)
      .addEdge(edgeAC)
      .addEdge(edgeCB)
      .addEdge(edgeBA)

    const { distances, nextVertices } = floydWarshall(graph)

    const vertices = graph.getAllNodes()

    const nodeAIndex = vertices.indexOf(nodeA)
    const nodeBIndex = vertices.indexOf(nodeB)
    const nodeCIndex = vertices.indexOf(nodeC)
    const nodeDIndex = vertices.indexOf(nodeD)
    const nodeEIndex = vertices.indexOf(nodeE)
    const nodeGIndex = vertices.indexOf(nodeG)
    const nodeFIndex = vertices.indexOf(nodeF)

    expect(distances[nodeFIndex][nodeGIndex]).toBe(Infinity)
    expect(distances[nodeFIndex][nodeFIndex]).toBe(0)
    expect(distances[nodeFIndex][nodeAIndex]).toBe(5)
    expect(distances[nodeFIndex][nodeBIndex]).toBe(5)
    expect(distances[nodeFIndex][nodeCIndex]).toBe(7)
    expect(distances[nodeFIndex][nodeDIndex]).toBe(9)
    expect(distances[nodeFIndex][nodeEIndex]).toBe(8)

    expect(nextVertices[nodeFIndex][nodeGIndex]).toBe(null)
    expect(nextVertices[nodeFIndex][nodeFIndex]).toBe(null)
    expect(nextVertices[nodeAIndex][nodeBIndex]).toBe(nodeC)
    expect(nextVertices[nodeAIndex][nodeCIndex]).toBe(nodeA)
    expect(nextVertices[nodeFIndex][nodeBIndex]).toBe(nodeE)
    expect(nextVertices[nodeEIndex][nodeBIndex]).toBe(nodeD)
    expect(nextVertices[nodeDIndex][nodeBIndex]).toBe(nodeC)
    expect(nextVertices[nodeCIndex][nodeBIndex]).toBe(nodeC)
  })
})
