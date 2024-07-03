import Graph from '../../../data-structures/graph/index'
import GraphNode from '../../../data-structures/graph/node'
import GraphEdge from '../../../data-structures/graph/edge'
import bfTravellingSalesman from '../travelling-salesman'

describe('bfTravellingSalesman', () => {
  it('должен решать проблему для простого графа', () => {
    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')

    const edgeAB = new GraphEdge(nodeA, nodeB, 1)
    const edgeBD = new GraphEdge(nodeB, nodeD, 1)
    const edgeDC = new GraphEdge(nodeD, nodeC, 1)
    const edgeCA = new GraphEdge(nodeC, nodeA, 1)

    const edgeBA = new GraphEdge(nodeB, nodeA, 5)
    const edgeDB = new GraphEdge(nodeD, nodeB, 8)
    const edgeCD = new GraphEdge(nodeC, nodeD, 7)
    const edgeAC = new GraphEdge(nodeA, nodeC, 4)
    const edgeAD = new GraphEdge(nodeA, nodeD, 2)
    const edgeDA = new GraphEdge(nodeD, nodeA, 3)
    const edgeBC = new GraphEdge(nodeB, nodeC, 3)
    const edgeCB = new GraphEdge(nodeC, nodeB, 9)

    const graph = new Graph(true)
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBD)
      .addEdge(edgeDC)
      .addEdge(edgeCA)
      .addEdge(edgeBA)
      .addEdge(edgeDB)
      .addEdge(edgeCD)
      .addEdge(edgeAC)
      .addEdge(edgeAD)
      .addEdge(edgeDA)
      .addEdge(edgeBC)
      .addEdge(edgeCB)

    const salesmanPath = bfTravellingSalesman(graph)

    expect(salesmanPath.length).toBe(4)

    expect(salesmanPath[0].getKey()).toEqual(nodeA.getKey())
    expect(salesmanPath[1].getKey()).toEqual(nodeB.getKey())
    expect(salesmanPath[2].getKey()).toEqual(nodeD.getKey())
    expect(salesmanPath[3].getKey()).toEqual(nodeC.getKey())
  })
})
