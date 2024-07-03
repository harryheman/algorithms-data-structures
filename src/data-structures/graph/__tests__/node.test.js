import Node from '../node'
import Edge from '../edge'

describe('Node', () => {
  it('должно выбрасываться исключение при создании узла без значения', () => {
    let node = null

    function createEmptyVertex() {
      node = new Node()
    }

    expect(node).toBeNull()
    expect(createEmptyVertex).toThrow()
  })

  it('должна создать узел графа', () => {
    const node = new Node('A')

    expect(node).toBeDefined()
    expect(node.value).toBe('A')
    expect(node.toString()).toBe('A')
    expect(node.getKey()).toBe('A')
    expect(node.edges.toString()).toBe('')
    expect(node.getEdges()).toEqual([])
  })

  it('должна добавить ребра в узел и проверить их наличие', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')

    const edgeAB = new Edge(nodeA, nodeB)
    nodeA.addEdge(edgeAB)

    expect(nodeA.hasEdge(edgeAB)).toBe(true)
    expect(nodeB.hasEdge(edgeAB)).toBe(false)
    expect(nodeA.getEdges().length).toBe(1)
    expect(nodeA.getEdges()[0].toString()).toBe('A_B')
  })

  it('должна удалить ребра из узла', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    const edgeAB = new Edge(nodeA, nodeB)
    const edgeAC = new Edge(nodeA, nodeC)
    nodeA.addEdge(edgeAB).addEdge(edgeAC)

    expect(nodeA.hasEdge(edgeAB)).toBe(true)
    expect(nodeB.hasEdge(edgeAB)).toBe(false)

    expect(nodeA.hasEdge(edgeAC)).toBe(true)
    expect(nodeC.hasEdge(edgeAC)).toBe(false)

    expect(nodeA.getEdges().length).toBe(2)

    expect(nodeA.getEdges()[0].toString()).toBe('A_B')
    expect(nodeA.getEdges()[1].toString()).toBe('A_C')

    nodeA.removeEdge(edgeAB)
    expect(nodeA.hasEdge(edgeAB)).toBe(false)
    expect(nodeA.hasEdge(edgeAC)).toBe(true)
    expect(nodeA.getEdges()[0].toString()).toBe('A_C')

    nodeA.removeEdge(edgeAC)
    expect(nodeA.hasEdge(edgeAB)).toBe(false)
    expect(nodeA.hasEdge(edgeAC)).toBe(false)
    expect(nodeA.getEdges().length).toBe(0)
  })

  it('должна удалить все ребра из узла', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    const edgeAB = new Edge(nodeA, nodeB)
    const edgeAC = new Edge(nodeA, nodeC)
    nodeA.addEdge(edgeAB).addEdge(edgeAC)

    expect(nodeA.hasEdge(edgeAB)).toBe(true)
    expect(nodeB.hasEdge(edgeAB)).toBe(false)

    expect(nodeA.hasEdge(edgeAC)).toBe(true)
    expect(nodeC.hasEdge(edgeAC)).toBe(false)

    expect(nodeA.getEdges().length).toBe(2)

    nodeA.removeAllEdges()

    expect(nodeA.hasEdge(edgeAB)).toBe(false)
    expect(nodeB.hasEdge(edgeAB)).toBe(false)

    expect(nodeA.hasEdge(edgeAC)).toBe(false)
    expect(nodeC.hasEdge(edgeAC)).toBe(false)

    expect(nodeA.getEdges().length).toBe(0)
  })

  it('должна вернуть соседей узла в случае, если текущий узел является стартовым', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    const edgeAB = new Edge(nodeA, nodeB)
    const edgeAC = new Edge(nodeA, nodeC)
    nodeA.addEdge(edgeAB).addEdge(edgeAC)

    expect(nodeB.getNeighbors()).toEqual([])

    const neighbors = nodeA.getNeighbors()

    expect(neighbors.length).toBe(2)
    expect(neighbors[0]).toEqual(nodeB)
    expect(neighbors[1]).toEqual(nodeC)
  })

  it('должна вернуть соседей узла в случае, если текущий узел является конечным', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    const edgeBA = new Edge(nodeB, nodeA)
    const edgeCA = new Edge(nodeC, nodeA)
    nodeA.addEdge(edgeBA).addEdge(edgeCA)

    expect(nodeB.getNeighbors()).toEqual([])

    const neighbors = nodeA.getNeighbors()

    expect(neighbors.length).toBe(2)
    expect(neighbors[0]).toEqual(nodeB)
    expect(neighbors[1]).toEqual(nodeC)
  })

  it('должна проверять наличие указанного соседа узла', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    const edgeAB = new Edge(nodeA, nodeB)
    nodeA.addEdge(edgeAB)

    expect(nodeA.hasNeighbor(nodeB)).toBe(true)
    expect(nodeA.hasNeighbor(nodeC)).toBe(false)
  })

  it('должна находить ребро по узлу', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    const edgeAB = new Edge(nodeA, nodeB)
    nodeA.addEdge(edgeAB)

    expect(nodeA.findEdge(nodeB)).toEqual(edgeAB)
    expect(nodeA.findEdge(nodeC)).toBeNull()
  })

  it('должна вычислять глубину узла', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')

    expect(nodeA.getDegree()).toBe(0)

    const edgeAB = new Edge(nodeA, nodeB)
    nodeA.addEdge(edgeAB)

    expect(nodeA.getDegree()).toBe(1)

    const edgeBA = new Edge(nodeB, nodeA)
    nodeA.addEdge(edgeBA)

    expect(nodeA.getDegree()).toBe(2)

    nodeA.addEdge(edgeAB)
    expect(nodeA.getDegree()).toBe(3)

    expect(nodeA.getEdges().length).toEqual(3)
  })
})
