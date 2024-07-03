import Graph from '../../../data-structures/graph/index'
import GraphNode from '../../../data-structures/graph/node'
import GraphEdge from '../../../data-structures/graph/edge'
import breadthFirstSearch from '../breadth-first-search'

describe('breadthFirstSearch', () => {
  it('should perform BFS operation on graph', () => {
    const graph = new Graph(true)

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
    const edgeCG = new GraphEdge(nodeC, nodeG)
    const edgeAD = new GraphEdge(nodeA, nodeD)
    const edgeAE = new GraphEdge(nodeA, nodeE)
    const edgeEF = new GraphEdge(nodeE, nodeF)
    const edgeFD = new GraphEdge(nodeF, nodeD)
    const edgeDH = new GraphEdge(nodeD, nodeH)
    const edgeGH = new GraphEdge(nodeG, nodeH)

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCG)
      .addEdge(edgeAD)
      .addEdge(edgeAE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeDH)
      .addEdge(edgeGH)

    expect(graph.toString()).toBe('A,B,C,G,D,E,F,H')

    const enterNodeCallback = jest.fn()
    const leaveNodeCallback = jest.fn()

    // Traverse graphs without callbacks first.
    breadthFirstSearch(graph, nodeA)

    // Traverse graph with enterNode and leaveNode callbacks.
    breadthFirstSearch(graph, nodeA, {
      enterNode: enterNodeCallback,
      leaveNode: leaveNodeCallback,
    })

    expect(enterNodeCallback).toHaveBeenCalledTimes(8)
    expect(leaveNodeCallback).toHaveBeenCalledTimes(8)

    const enterNodeParamsMap = [
      { currentNode: nodeA, previousNode: null },
      { currentNode: nodeB, previousNode: nodeA },
      { currentNode: nodeD, previousNode: nodeB },
      { currentNode: nodeE, previousNode: nodeD },
      { currentNode: nodeC, previousNode: nodeE },
      { currentNode: nodeH, previousNode: nodeC },
      { currentNode: nodeF, previousNode: nodeH },
      { currentNode: nodeG, previousNode: nodeF },
    ]

    for (
      let callIndex = 0;
      callIndex < graph.getAllNodes().length;
      callIndex += 1
    ) {
      const params = enterNodeCallback.mock.calls[callIndex][0]
      expect(params.currentNode).toEqual(
        enterNodeParamsMap[callIndex].currentNode,
      )
      expect(params.previousNode).toEqual(
        enterNodeParamsMap[callIndex].previousNode,
      )
    }

    const leaveNodeParamsMap = [
      { currentNode: nodeA, previousNode: null },
      { currentNode: nodeB, previousNode: nodeA },
      { currentNode: nodeD, previousNode: nodeB },
      { currentNode: nodeE, previousNode: nodeD },
      { currentNode: nodeC, previousNode: nodeE },
      { currentNode: nodeH, previousNode: nodeC },
      { currentNode: nodeF, previousNode: nodeH },
      { currentNode: nodeG, previousNode: nodeF },
    ]

    for (
      let callIndex = 0;
      callIndex < graph.getAllNodes().length;
      callIndex += 1
    ) {
      const params = leaveNodeCallback.mock.calls[callIndex][0]
      expect(params.currentNode).toEqual(
        leaveNodeParamsMap[callIndex].currentNode,
      )
      expect(params.previousNode).toEqual(
        leaveNodeParamsMap[callIndex].previousNode,
      )
    }
  })

  it('should allow to create custom node visiting logic', () => {
    const graph = new Graph(true)

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
    const edgeCG = new GraphEdge(nodeC, nodeG)
    const edgeAD = new GraphEdge(nodeA, nodeD)
    const edgeAE = new GraphEdge(nodeA, nodeE)
    const edgeEF = new GraphEdge(nodeE, nodeF)
    const edgeFD = new GraphEdge(nodeF, nodeD)
    const edgeDH = new GraphEdge(nodeD, nodeH)
    const edgeGH = new GraphEdge(nodeG, nodeH)

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCG)
      .addEdge(edgeAD)
      .addEdge(edgeAE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeDH)
      .addEdge(edgeGH)

    expect(graph.toString()).toBe('A,B,C,G,D,E,F,H')

    const enterNodeCallback = jest.fn()
    const leaveNodeCallback = jest.fn()

    // Traverse graph with enterNode and leaveNode callbacks.
    breadthFirstSearch(graph, nodeA, {
      enterNode: enterNodeCallback,
      leaveNode: leaveNodeCallback,
      allowTraverse: ({ currentNode, nextNode }) => {
        return !(currentNode === nodeA && nextNode === nodeB)
      },
    })

    expect(enterNodeCallback).toHaveBeenCalledTimes(7)
    expect(leaveNodeCallback).toHaveBeenCalledTimes(7)

    const enterNodeParamsMap = [
      { currentNode: nodeA, previousNode: null },
      { currentNode: nodeD, previousNode: nodeA },
      { currentNode: nodeE, previousNode: nodeD },
      { currentNode: nodeH, previousNode: nodeE },
      { currentNode: nodeF, previousNode: nodeH },
      { currentNode: nodeD, previousNode: nodeF },
      { currentNode: nodeH, previousNode: nodeD },
    ]

    for (let callIndex = 0; callIndex < 7; callIndex += 1) {
      const params = enterNodeCallback.mock.calls[callIndex][0]
      expect(params.currentNode).toEqual(
        enterNodeParamsMap[callIndex].currentNode,
      )
      expect(params.previousNode).toEqual(
        enterNodeParamsMap[callIndex].previousNode,
      )
    }

    const leaveNodeParamsMap = [
      { currentNode: nodeA, previousNode: null },
      { currentNode: nodeD, previousNode: nodeA },
      { currentNode: nodeE, previousNode: nodeD },
      { currentNode: nodeH, previousNode: nodeE },
      { currentNode: nodeF, previousNode: nodeH },
      { currentNode: nodeD, previousNode: nodeF },
      { currentNode: nodeH, previousNode: nodeD },
    ]

    for (let callIndex = 0; callIndex < 7; callIndex += 1) {
      const params = leaveNodeCallback.mock.calls[callIndex][0]
      expect(params.currentNode).toEqual(
        leaveNodeParamsMap[callIndex].currentNode,
      )
      expect(params.previousNode).toEqual(
        leaveNodeParamsMap[callIndex].previousNode,
      )
    }
  })
})
