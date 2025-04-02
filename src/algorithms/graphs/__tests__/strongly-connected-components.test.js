import Graph from '../../../data-structures/graph/index'
import GraphNode from '../../../data-structures/graph/node'
import GraphEdge from '../../../data-structures/graph/edge'
import stronglyConnectedComponents from '../strongly-connected-components'

describe('stronglyConnectedComponents', () => {
  it('должен обнаруживать сильно связанные компоненты в простом графе', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeCA = new GraphEdge(nodeC, nodeA)
    const edgeCD = new GraphEdge(nodeC, nodeD)

    const graph = new Graph(true)

    graph.addEdge(edgeAB).addEdge(edgeBC).addEdge(edgeCA).addEdge(edgeCD)

    const components = stronglyConnectedComponents(graph)

    expect(components).toBeDefined()
    expect(components.length).toBe(2)

    expect(components[0][0].getKey()).toBe(nodeA.getKey())
    expect(components[0][1].getKey()).toBe(nodeC.getKey())
    expect(components[0][2].getKey()).toBe(nodeB.getKey())

    expect(components[1][0].getKey()).toBe(nodeD.getKey())
  })

  it('должен обнаруживать сильно связанные компоненты в графе', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')
    const nodeG = new GraphNode('G')
    const nodeH = new GraphNode('H')
    const nodeI = new GraphNode('I')
    const nodeJ = new GraphNode('J')
    const nodeK = new GraphNode('K')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeCA = new GraphEdge(nodeC, nodeA)
    const edgeBD = new GraphEdge(nodeB, nodeD)
    const edgeDE = new GraphEdge(nodeD, nodeE)
    const edgeEF = new GraphEdge(nodeE, nodeF)
    const edgeFD = new GraphEdge(nodeF, nodeD)
    const edgeGF = new GraphEdge(nodeG, nodeF)
    const edgeGH = new GraphEdge(nodeG, nodeH)
    const edgeHI = new GraphEdge(nodeH, nodeI)
    const edgeIJ = new GraphEdge(nodeI, nodeJ)
    const edgeJG = new GraphEdge(nodeJ, nodeG)
    const edgeJK = new GraphEdge(nodeJ, nodeK)

    const graph = new Graph(true)

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCA)
      .addEdge(edgeBD)
      .addEdge(edgeDE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeGF)
      .addEdge(edgeGH)
      .addEdge(edgeHI)
      .addEdge(edgeIJ)
      .addEdge(edgeJG)
      .addEdge(edgeJK)

    const components = stronglyConnectedComponents(graph)

    expect(components).toBeDefined()
    expect(components.length).toBe(4)

    expect(components[0][0].getKey()).toBe(nodeG.getKey())
    expect(components[0][1].getKey()).toBe(nodeJ.getKey())
    expect(components[0][2].getKey()).toBe(nodeI.getKey())
    expect(components[0][3].getKey()).toBe(nodeH.getKey())

    expect(components[1][0].getKey()).toBe(nodeK.getKey())

    expect(components[2][0].getKey()).toBe(nodeA.getKey())
    expect(components[2][1].getKey()).toBe(nodeC.getKey())
    expect(components[2][2].getKey()).toBe(nodeB.getKey())

    expect(components[3][0].getKey()).toBe(nodeD.getKey())
    expect(components[3][1].getKey()).toBe(nodeF.getKey())
    expect(components[3][2].getKey()).toBe(nodeE.getKey())
  })
})
