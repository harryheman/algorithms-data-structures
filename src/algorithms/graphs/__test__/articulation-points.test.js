import Graph from '../../../data-structures/graph/index'
import GraphNode from '../../../data-structures/graph/node'
import GraphEdge from '../../../data-structures/graph/edge'
import articulationPoints from '../articulation-points'

describe('articulationPoints', () => {
  it('should find articulation points in simple graph', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeCD = new GraphEdge(nodeC, nodeD)

    const graph = new Graph()

    graph.addEdge(edgeAB).addEdge(edgeBC).addEdge(edgeCD)

    const articulationPointsSet = Object.values(articulationPoints(graph))

    expect(articulationPointsSet.length).toBe(2)
    expect(articulationPointsSet[0].getKey()).toBe(nodeC.getKey())
    expect(articulationPointsSet[1].getKey()).toBe(nodeB.getKey())
  })

  it('should find articulation points in simple graph with back edge', () => {
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

    const articulationPointsSet = Object.values(articulationPoints(graph))

    expect(articulationPointsSet.length).toBe(1)
    expect(articulationPointsSet[0].getKey()).toBe(nodeC.getKey())
  })

  it('should find articulation points in simple graph with back edge #2', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeCD = new GraphEdge(nodeC, nodeD)
    const edgeAE = new GraphEdge(nodeA, nodeE)
    const edgeCE = new GraphEdge(nodeC, nodeE)

    const graph = new Graph()

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAE)
      .addEdge(edgeCE)
      .addEdge(edgeBC)
      .addEdge(edgeCD)

    const articulationPointsSet = Object.values(articulationPoints(graph))

    expect(articulationPointsSet.length).toBe(1)
    expect(articulationPointsSet[0].getKey()).toBe(nodeC.getKey())
  })

  it('should find articulation points in graph', () => {
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

    const articulationPointsSet = Object.values(articulationPoints(graph))

    expect(articulationPointsSet.length).toBe(4)
    expect(articulationPointsSet[0].getKey()).toBe(nodeF.getKey())
    expect(articulationPointsSet[1].getKey()).toBe(nodeE.getKey())
    expect(articulationPointsSet[2].getKey()).toBe(nodeD.getKey())
    expect(articulationPointsSet[3].getKey()).toBe(nodeC.getKey())
  })

  it('should find articulation points in graph starting with articulation root node', () => {
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

    const articulationPointsSet = Object.values(articulationPoints(graph))

    expect(articulationPointsSet.length).toBe(4)
    expect(articulationPointsSet[0].getKey()).toBe(nodeF.getKey())
    expect(articulationPointsSet[1].getKey()).toBe(nodeE.getKey())
    expect(articulationPointsSet[2].getKey()).toBe(nodeC.getKey())
    expect(articulationPointsSet[3].getKey()).toBe(nodeD.getKey())
  })

  it('should find articulation points in yet another graph #1', () => {
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

    const articulationPointsSet = Object.values(articulationPoints(graph))

    expect(articulationPointsSet.length).toBe(2)
    expect(articulationPointsSet[0].getKey()).toBe(nodeD.getKey())
    expect(articulationPointsSet[1].getKey()).toBe(nodeC.getKey())
  })

  it('should find articulation points in yet another graph #2', () => {
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

    const articulationPointsSet = Object.values(articulationPoints(graph))

    expect(articulationPointsSet.length).toBe(1)
    expect(articulationPointsSet[0].getKey()).toBe(nodeC.getKey())
  })
})
