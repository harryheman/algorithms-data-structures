import Graph from '..'
import Node from '../node'
import Edge from '../edge'

describe('Graph', () => {
  it('должна добавить узлы в граф', () => {
    const graph = new Graph()

    const nodeA = new Node('A')
    const nodeB = new Node('B')

    graph.addNode(nodeA).addNode(nodeB)

    expect(graph.toString()).toBe('A,B')
    expect(graph.getNodeByKey(nodeA.getKey())).toEqual(nodeA)
    expect(graph.getNodeByKey(nodeB.getKey())).toEqual(nodeB)
  })

  it('должна добавить ребра в ненаправленный граф', () => {
    const graph = new Graph()

    const nodeA = new Node('A')
    const nodeB = new Node('B')

    const edgeAB = new Edge(nodeA, nodeB)

    graph.addEdge(edgeAB)

    expect(graph.getAllNodes().length).toBe(2)
    expect(graph.getAllNodes()[0]).toEqual(nodeA)
    expect(graph.getAllNodes()[1]).toEqual(nodeB)

    const graphNodeA = graph.getNodeByKey(nodeA.getKey())
    const graphNodeB = graph.getNodeByKey(nodeB.getKey())

    expect(graph.toString()).toBe('A,B')
    expect(graphNodeA).toBeDefined()
    expect(graphNodeB).toBeDefined()

    expect(graph.getNodeByKey('not existing')).toBeUndefined()

    expect(graphNodeA.getNeighbors().length).toBe(1)
    expect(graphNodeA.getNeighbors()[0]).toEqual(nodeB)
    expect(graphNodeA.getNeighbors()[0]).toEqual(graphNodeB)

    expect(graphNodeB.getNeighbors().length).toBe(1)
    expect(graphNodeB.getNeighbors()[0]).toEqual(nodeA)
    expect(graphNodeB.getNeighbors()[0]).toEqual(graphNodeA)
  })

  it('должна добавить ребра в направленный граф', () => {
    const graph = new Graph(true)

    const nodeA = new Node('A')
    const nodeB = new Node('B')

    const edgeAB = new Edge(nodeA, nodeB)

    graph.addEdge(edgeAB)

    const graphNodeA = graph.getNodeByKey(nodeA.getKey())
    const graphNodeB = graph.getNodeByKey(nodeB.getKey())

    expect(graph.toString()).toBe('A,B')
    expect(graphNodeA).toBeDefined()
    expect(graphNodeB).toBeDefined()

    expect(graphNodeA.getNeighbors().length).toBe(1)
    expect(graphNodeA.getNeighbors()[0]).toEqual(nodeB)
    expect(graphNodeA.getNeighbors()[0]).toEqual(graphNodeB)

    expect(graphNodeB.getNeighbors().length).toBe(0)
  })

  it('должна найти ребро по узлам в ненаправленном графе', () => {
    const graph = new Graph()

    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    const edgeAB = new Edge(nodeA, nodeB, 10)

    graph.addEdge(edgeAB)

    const graphEdgeAB = graph.findEdge(nodeA, nodeB)
    const graphEdgeBA = graph.findEdge(nodeB, nodeA)
    const graphEdgeAC = graph.findEdge(nodeA, nodeC)
    const graphEdgeCA = graph.findEdge(nodeC, nodeA)

    expect(graphEdgeAC).toBeNull()
    expect(graphEdgeCA).toBeNull()
    expect(graphEdgeAB).toEqual(edgeAB)
    expect(graphEdgeBA).toEqual(edgeAB)
    expect(graphEdgeAB.weight).toBe(10)
  })

  it('должна найти ребро по узлам в направленном графе', () => {
    const graph = new Graph(true)

    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    const edgeAB = new Edge(nodeA, nodeB, 10)

    graph.addEdge(edgeAB)

    const graphEdgeAB = graph.findEdge(nodeA, nodeB)
    const graphEdgeBA = graph.findEdge(nodeB, nodeA)
    const graphEdgeAC = graph.findEdge(nodeA, nodeC)
    const graphEdgeCA = graph.findEdge(nodeC, nodeA)

    expect(graphEdgeAC).toBeNull()
    expect(graphEdgeCA).toBeNull()
    expect(graphEdgeBA).toBeNull()
    expect(graphEdgeAB).toEqual(edgeAB)
    expect(graphEdgeAB.weight).toBe(10)
  })

  it('должна вернуть соседей узла', () => {
    const graph = new Graph(true)

    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    const edgeAB = new Edge(nodeA, nodeB)
    const edgeAC = new Edge(nodeA, nodeC)

    graph.addEdge(edgeAB).addEdge(edgeAC)

    const neighbors = graph.getNeighbors(nodeA)

    expect(neighbors.length).toBe(2)
    expect(neighbors[0]).toEqual(nodeB)
    expect(neighbors[1]).toEqual(nodeC)
  })

  it('должна выбросить исключение при повторном добавлении ребра', () => {
    function addSameEdgeTwice() {
      const graph = new Graph(true)

      const nodeA = new Node('A')
      const nodeB = new Node('B')

      const edgeAB = new Edge(nodeA, nodeB)

      graph.addEdge(edgeAB).addEdge(edgeAB)
    }

    expect(addSameEdgeTwice).toThrow()
  })

  it('должна вернуть список всех добавленных узлов', () => {
    const graph = new Graph(true)

    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    const edgeAB = new Edge(nodeA, nodeB)
    const edgeBC = new Edge(nodeB, nodeC)

    graph.addEdge(edgeAB).addEdge(edgeBC)

    const edges = graph.getAllEdges()

    expect(edges.length).toBe(2)
    expect(edges[0]).toEqual(edgeAB)
    expect(edges[1]).toEqual(edgeBC)
  })

  it('должна вычислить общий вес дефолтного графа', () => {
    const graph = new Graph()

    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')
    const nodeD = new Node('D')

    const edgeAB = new Edge(nodeA, nodeB)
    const edgeBC = new Edge(nodeB, nodeC)
    const edgeCD = new Edge(nodeC, nodeD)
    const edgeAD = new Edge(nodeA, nodeD)

    graph.addEdge(edgeAB).addEdge(edgeBC).addEdge(edgeCD).addEdge(edgeAD)

    expect(graph.getWeight()).toBe(0)
  })

  it('должна вычислить общий вес взвешенного графа', () => {
    const graph = new Graph()

    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')
    const nodeD = new Node('D')

    const edgeAB = new Edge(nodeA, nodeB, 1)
    const edgeBC = new Edge(nodeB, nodeC, 2)
    const edgeCD = new Edge(nodeC, nodeD, 3)
    const edgeAD = new Edge(nodeA, nodeD, 4)

    graph.addEdge(edgeAB).addEdge(edgeBC).addEdge(edgeCD).addEdge(edgeAD)

    expect(graph.getWeight()).toBe(10)
  })

  it('должна быть возможность удалять ребра из графа', () => {
    const graph = new Graph()

    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    const edgeAB = new Edge(nodeA, nodeB)
    const edgeBC = new Edge(nodeB, nodeC)
    const edgeAC = new Edge(nodeA, nodeC)

    graph.addEdge(edgeAB).addEdge(edgeBC).addEdge(edgeAC)

    expect(graph.getAllEdges().length).toBe(3)

    graph.removeEdge(edgeAB)

    expect(graph.getAllEdges().length).toBe(2)
    expect(graph.getAllEdges()[0].getKey()).toBe(edgeBC.getKey())
    expect(graph.getAllEdges()[1].getKey()).toBe(edgeAC.getKey())
  })

  it('должна выбросить исключение при удалении несуществующего узла', () => {
    function deleteNotExistingEdge() {
      const graph = new Graph()

      const nodeA = new Node('A')
      const nodeB = new Node('B')
      const nodeC = new Node('C')

      const edgeAB = new Edge(nodeA, nodeB)
      const edgeBC = new Edge(nodeB, nodeC)

      graph.addEdge(edgeAB)
      graph.removeEdge(edgeBC)
    }

    expect(deleteNotExistingEdge).toThrowError()
  })

  it('должна быть возможность инвертировать граф', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')
    const nodeD = new Node('D')

    const edgeAB = new Edge(nodeA, nodeB)
    const edgeAC = new Edge(nodeA, nodeC)
    const edgeCD = new Edge(nodeC, nodeD)

    const graph = new Graph(true)
    graph.addEdge(edgeAB).addEdge(edgeAC).addEdge(edgeCD)

    expect(graph.toString()).toBe('A,B,C,D')
    expect(graph.getAllEdges().length).toBe(3)
    expect(graph.getNeighbors(nodeA).length).toBe(2)
    expect(graph.getNeighbors(nodeA)[0].getKey()).toBe(nodeB.getKey())
    expect(graph.getNeighbors(nodeA)[1].getKey()).toBe(nodeC.getKey())
    expect(graph.getNeighbors(nodeB).length).toBe(0)
    expect(graph.getNeighbors(nodeC).length).toBe(1)
    expect(graph.getNeighbors(nodeC)[0].getKey()).toBe(nodeD.getKey())
    expect(graph.getNeighbors(nodeD).length).toBe(0)

    graph.reverse()

    expect(graph.toString()).toBe('A,B,C,D')
    expect(graph.getAllEdges().length).toBe(3)
    expect(graph.getNeighbors(nodeA).length).toBe(0)
    expect(graph.getNeighbors(nodeB).length).toBe(1)
    expect(graph.getNeighbors(nodeB)[0].getKey()).toBe(nodeA.getKey())
    expect(graph.getNeighbors(nodeC).length).toBe(1)
    expect(graph.getNeighbors(nodeC)[0].getKey()).toBe(nodeA.getKey())
    expect(graph.getNeighbors(nodeD).length).toBe(1)
    expect(graph.getNeighbors(nodeD)[0].getKey()).toBe(nodeC.getKey())
  })

  it('должна вернуть индексы узлов', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')
    const nodeD = new Node('D')

    const edgeAB = new Edge(nodeA, nodeB)
    const edgeBC = new Edge(nodeB, nodeC)
    const edgeCD = new Edge(nodeC, nodeD)
    const edgeBD = new Edge(nodeB, nodeD)

    const graph = new Graph()
    graph.addEdge(edgeAB).addEdge(edgeBC).addEdge(edgeCD).addEdge(edgeBD)

    const verticesIndices = graph.getNodesIndices()
    expect(verticesIndices).toEqual({
      A: 0,
      B: 1,
      C: 2,
      D: 3,
    })
  })

  it('должна генерировать матрицу смежности для ненаправленного графа', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')
    const nodeD = new Node('D')

    const edgeAB = new Edge(nodeA, nodeB)
    const edgeBC = new Edge(nodeB, nodeC)
    const edgeCD = new Edge(nodeC, nodeD)
    const edgeBD = new Edge(nodeB, nodeD)

    const graph = new Graph()
    graph.addEdge(edgeAB).addEdge(edgeBC).addEdge(edgeCD).addEdge(edgeBD)

    const adjacencyMatrix = graph.getAdjacencyMatrix()
    expect(adjacencyMatrix).toEqual([
      [null, 0, null, null],
      [0, null, 0, 0],
      [null, 0, null, 0],
      [null, 0, 0, null],
    ])
  })

  it('должна генерировать матрицу смежности для направленного графа', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')
    const nodeD = new Node('D')

    const edgeAB = new Edge(nodeA, nodeB, 2)
    const edgeBC = new Edge(nodeB, nodeC, 1)
    const edgeCD = new Edge(nodeC, nodeD, 5)
    const edgeBD = new Edge(nodeB, nodeD, 7)

    const graph = new Graph(true)
    graph.addEdge(edgeAB).addEdge(edgeBC).addEdge(edgeCD).addEdge(edgeBD)

    const adjacencyMatrix = graph.getAdjacencyMatrix()
    expect(adjacencyMatrix).toEqual([
      [null, 2, null, null],
      [null, null, 1, 7],
      [null, null, null, 5],
      [null, null, null, null],
    ])
  })
})
