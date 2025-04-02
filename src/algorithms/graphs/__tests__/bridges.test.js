import Graph from '../../../data-structures/graph/index'
import GraphNode from '../../../data-structures/graph/node'
import GraphEdge from '../../../data-structures/graph/edge'
import graphBridges from '../bridges'

describe('graphBridges', () => {
  it('должен находить мосты в простом графе', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeCD = new GraphEdge(nodeC, nodeD)

    const graph = new Graph()

    graph.addEdge(edgeAB).addEdge(edgeBC).addEdge(edgeCD)

    const bridges = Object.values(graphBridges(graph))

    expect(bridges.length).toBe(3)
    expect(bridges[0].getKey()).toBe(edgeCD.getKey())
    expect(bridges[1].getKey()).toBe(edgeBC.getKey())
    expect(bridges[2].getKey()).toBe(edgeAB.getKey())
  })

  it('должен находить мосты в простом графе с обратными ребрами', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeCD = new GraphEdge(nodeC, nodeD)
    const edgeAC = new GraphEdge(nodeA, nodeC)

    const graph = new Graph()

    graph.addEdge(edgeAB).addEdge(edgeAC).addEdge(edgeBC).addEdge(edgeCD)

    const bridges = Object.values(graphBridges(graph))

    expect(bridges.length).toBe(1)
    expect(bridges[0].getKey()).toBe(edgeCD.getKey())
  })

  it('должен находить мосты в графе', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')
    const nodeG = new GraphNode('G')
    const nodeH = new GraphNode('H')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeAC = new GraphEdge(nodeA, nodeC)
    const edgeCD = new GraphEdge(nodeC, nodeD)
    const edgeDE = new GraphEdge(nodeD, nodeE)
    const edgeEG = new GraphEdge(nodeE, nodeG)
    const edgeEF = new GraphEdge(nodeE, nodeF)
    const edgeGF = new GraphEdge(nodeG, nodeF)
    const edgeFH = new GraphEdge(nodeF, nodeH)

    const graph = new Graph()

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeAC)
      .addEdge(edgeCD)
      .addEdge(edgeDE)
      .addEdge(edgeEG)
      .addEdge(edgeEF)
      .addEdge(edgeGF)
      .addEdge(edgeFH)

    const bridges = Object.values(graphBridges(graph))

    expect(bridges.length).toBe(3)
    expect(bridges[0].getKey()).toBe(edgeFH.getKey())
    expect(bridges[1].getKey()).toBe(edgeDE.getKey())
    expect(bridges[2].getKey()).toBe(edgeCD.getKey())
  })

  it('должен находить мосты в графе, начиная с разных корневых узлов', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')
    const nodeG = new GraphNode('G')
    const nodeH = new GraphNode('H')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeAC = new GraphEdge(nodeA, nodeC)
    const edgeCD = new GraphEdge(nodeC, nodeD)
    const edgeDE = new GraphEdge(nodeD, nodeE)
    const edgeEG = new GraphEdge(nodeE, nodeG)
    const edgeEF = new GraphEdge(nodeE, nodeF)
    const edgeGF = new GraphEdge(nodeG, nodeF)
    const edgeFH = new GraphEdge(nodeF, nodeH)

    const graph = new Graph()

    graph
      .addEdge(edgeDE)
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeAC)
      .addEdge(edgeCD)
      .addEdge(edgeEG)
      .addEdge(edgeEF)
      .addEdge(edgeGF)
      .addEdge(edgeFH)

    const bridges = Object.values(graphBridges(graph))

    expect(bridges.length).toBe(3)
    expect(bridges[0].getKey()).toBe(edgeFH.getKey())
    expect(bridges[1].getKey()).toBe(edgeDE.getKey())
    expect(bridges[2].getKey()).toBe(edgeCD.getKey())
  })

  it('должен находить мосты еще в одном графе #1', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeAC = new GraphEdge(nodeA, nodeC)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeCD = new GraphEdge(nodeC, nodeD)
    const edgeDE = new GraphEdge(nodeD, nodeE)

    const graph = new Graph()

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeDE)

    const bridges = Object.values(graphBridges(graph))

    expect(bridges.length).toBe(2)
    expect(bridges[0].getKey()).toBe(edgeDE.getKey())
    expect(bridges[1].getKey()).toBe(edgeCD.getKey())
  })

  it('должен находить мосты еще в одном графе #2', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')
    const nodeG = new GraphNode('G')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeAC = new GraphEdge(nodeA, nodeC)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeCD = new GraphEdge(nodeC, nodeD)
    const edgeCE = new GraphEdge(nodeC, nodeE)
    const edgeCF = new GraphEdge(nodeC, nodeF)
    const edgeEG = new GraphEdge(nodeE, nodeG)
    const edgeFG = new GraphEdge(nodeF, nodeG)

    const graph = new Graph()

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeCE)
      .addEdge(edgeCF)
      .addEdge(edgeEG)
      .addEdge(edgeFG)

    const bridges = Object.values(graphBridges(graph))

    expect(bridges.length).toBe(1)
    expect(bridges[0].getKey()).toBe(edgeCD.getKey())
  })
})
