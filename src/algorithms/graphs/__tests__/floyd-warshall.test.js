import Graph from '../../../data-structures/graph/index'
import GraphEdge from '../../../data-structures/graph/edge'
import GraphVertex from '../../../data-structures/graph/node'
import floydWarshall from '../floyd-warshall'

describe('floydWarshall', () => {
  it('должен найти минимальные пути для всех вершин ненаправленного графа', () => {
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')
    const vertexE = new GraphVertex('E')
    const vertexF = new GraphVertex('F')
    const vertexG = new GraphVertex('G')
    const vertexH = new GraphVertex('H')

    const edgeAB = new GraphEdge(vertexA, vertexB, 4)
    const edgeAE = new GraphEdge(vertexA, vertexE, 7)
    const edgeAC = new GraphEdge(vertexA, vertexC, 3)
    const edgeBC = new GraphEdge(vertexB, vertexC, 6)
    const edgeBD = new GraphEdge(vertexB, vertexD, 5)
    const edgeEC = new GraphEdge(vertexE, vertexC, 8)
    const edgeED = new GraphEdge(vertexE, vertexD, 2)
    const edgeDC = new GraphEdge(vertexD, vertexC, 11)
    const edgeDG = new GraphEdge(vertexD, vertexG, 10)
    const edgeDF = new GraphEdge(vertexD, vertexF, 2)
    const edgeFG = new GraphEdge(vertexF, vertexG, 3)
    const edgeEG = new GraphEdge(vertexE, vertexG, 5)

    const graph = new Graph()

    // Сначала добавляем вершины в правильном порядке
    graph
      .addNode(vertexA)
      .addNode(vertexB)
      .addNode(vertexC)
      .addNode(vertexD)
      .addNode(vertexE)
      .addNode(vertexF)
      .addNode(vertexG)
      .addNode(vertexH)

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

    const vertexAIndex = vertices.indexOf(vertexA)
    const vertexBIndex = vertices.indexOf(vertexB)
    const vertexCIndex = vertices.indexOf(vertexC)
    const vertexDIndex = vertices.indexOf(vertexD)
    const vertexEIndex = vertices.indexOf(vertexE)
    const vertexFIndex = vertices.indexOf(vertexF)
    const vertexGIndex = vertices.indexOf(vertexG)
    const vertexHIndex = vertices.indexOf(vertexH)

    expect(distances[vertexAIndex][vertexHIndex]).toBe(Infinity)
    expect(distances[vertexAIndex][vertexAIndex]).toBe(0)
    expect(distances[vertexAIndex][vertexBIndex]).toBe(4)
    expect(distances[vertexAIndex][vertexEIndex]).toBe(7)
    expect(distances[vertexAIndex][vertexCIndex]).toBe(3)
    expect(distances[vertexAIndex][vertexDIndex]).toBe(9)
    expect(distances[vertexAIndex][vertexGIndex]).toBe(12)
    expect(distances[vertexAIndex][vertexFIndex]).toBe(11)

    expect(nextVertices[vertexAIndex][vertexFIndex]).toBe(vertexD)
    expect(nextVertices[vertexAIndex][vertexDIndex]).toBe(vertexB)
    expect(nextVertices[vertexAIndex][vertexBIndex]).toBe(vertexA)
    expect(nextVertices[vertexAIndex][vertexGIndex]).toBe(vertexE)
    expect(nextVertices[vertexAIndex][vertexCIndex]).toBe(vertexA)
    expect(nextVertices[vertexAIndex][vertexAIndex]).toBe(null)
    expect(nextVertices[vertexAIndex][vertexHIndex]).toBe(null)
  })

  it('должен найти минимальные пути для всех вершин направленного графа', () => {
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')

    const edgeAB = new GraphEdge(vertexA, vertexB, 3)
    const edgeBA = new GraphEdge(vertexB, vertexA, 8)
    const edgeAD = new GraphEdge(vertexA, vertexD, 7)
    const edgeDA = new GraphEdge(vertexD, vertexA, 2)
    const edgeBC = new GraphEdge(vertexB, vertexC, 2)
    const edgeCA = new GraphEdge(vertexC, vertexA, 5)
    const edgeCD = new GraphEdge(vertexC, vertexD, 1)

    const graph = new Graph(true)

    graph.addNode(vertexA).addNode(vertexB).addNode(vertexC).addNode(vertexD)

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

    const vertexAIndex = vertices.indexOf(vertexA)
    const vertexBIndex = vertices.indexOf(vertexB)
    const vertexCIndex = vertices.indexOf(vertexC)
    const vertexDIndex = vertices.indexOf(vertexD)

    expect(distances[vertexAIndex][vertexAIndex]).toBe(0)
    expect(distances[vertexAIndex][vertexBIndex]).toBe(3)
    expect(distances[vertexAIndex][vertexCIndex]).toBe(5)
    expect(distances[vertexAIndex][vertexDIndex]).toBe(6)

    expect(distances).toEqual([
      [0, 3, 5, 6],
      [5, 0, 2, 3],
      [3, 6, 0, 1],
      [2, 5, 7, 0],
    ])

    expect(nextVertices[vertexAIndex][vertexDIndex]).toBe(vertexC)
    expect(nextVertices[vertexAIndex][vertexCIndex]).toBe(vertexB)
    expect(nextVertices[vertexBIndex][vertexDIndex]).toBe(vertexC)
    expect(nextVertices[vertexAIndex][vertexAIndex]).toBe(null)
    expect(nextVertices[vertexAIndex][vertexBIndex]).toBe(vertexA)
  })

  it('должен найти минимальные пути для всех вершин направленного графа с отрицательными весами ребер', () => {
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')
    const vertexE = new GraphVertex('E')
    const vertexF = new GraphVertex('F')
    const vertexG = new GraphVertex('G')

    const edgeFE = new GraphEdge(vertexF, vertexE, 8)
    const edgeFA = new GraphEdge(vertexF, vertexA, 10)
    const edgeED = new GraphEdge(vertexE, vertexD, 1)
    const edgeDA = new GraphEdge(vertexD, vertexA, -4)
    const edgeDC = new GraphEdge(vertexD, vertexC, -1)
    const edgeAC = new GraphEdge(vertexA, vertexC, 2)
    const edgeCB = new GraphEdge(vertexC, vertexB, -2)
    const edgeBA = new GraphEdge(vertexB, vertexA, 1)

    const graph = new Graph(true)

    graph
      .addNode(vertexA)
      .addNode(vertexB)
      .addNode(vertexC)
      .addNode(vertexD)
      .addNode(vertexE)
      .addNode(vertexF)
      .addNode(vertexG)

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

    const vertexAIndex = vertices.indexOf(vertexA)
    const vertexBIndex = vertices.indexOf(vertexB)
    const vertexCIndex = vertices.indexOf(vertexC)
    const vertexDIndex = vertices.indexOf(vertexD)
    const vertexEIndex = vertices.indexOf(vertexE)
    const vertexGIndex = vertices.indexOf(vertexG)
    const vertexFIndex = vertices.indexOf(vertexF)

    expect(distances[vertexFIndex][vertexGIndex]).toBe(Infinity)
    expect(distances[vertexFIndex][vertexFIndex]).toBe(0)
    expect(distances[vertexFIndex][vertexAIndex]).toBe(5)
    expect(distances[vertexFIndex][vertexBIndex]).toBe(5)
    expect(distances[vertexFIndex][vertexCIndex]).toBe(7)
    expect(distances[vertexFIndex][vertexDIndex]).toBe(9)
    expect(distances[vertexFIndex][vertexEIndex]).toBe(8)

    expect(nextVertices[vertexFIndex][vertexGIndex]).toBe(null)
    expect(nextVertices[vertexFIndex][vertexFIndex]).toBe(null)
    expect(nextVertices[vertexAIndex][vertexBIndex]).toBe(vertexC)
    expect(nextVertices[vertexAIndex][vertexCIndex]).toBe(vertexA)
    expect(nextVertices[vertexFIndex][vertexBIndex]).toBe(vertexE)
    expect(nextVertices[vertexEIndex][vertexBIndex]).toBe(vertexD)
    expect(nextVertices[vertexDIndex][vertexBIndex]).toBe(vertexC)
    expect(nextVertices[vertexCIndex][vertexBIndex]).toBe(vertexC)
  })
})
