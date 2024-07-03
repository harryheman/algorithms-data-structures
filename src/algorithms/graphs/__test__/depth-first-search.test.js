import Graph from '../../../data-structures/graph/index'
import GraphNode from '../../../data-structures/graph/node'
import GraphEdge from '../../../data-structures/graph/edge'
import depthFirstSearch from '../depth-first-search'

describe('depthFirstSearch', () => {
  it('should perform DFS operation on graph', () => {
    const graph = new Graph(true)

    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')
    const nodeG = new GraphNode('G')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeCG = new GraphEdge(nodeC, nodeG)
    const edgeAD = new GraphEdge(nodeA, nodeD)
    const edgeAE = new GraphEdge(nodeA, nodeE)
    const edgeEF = new GraphEdge(nodeE, nodeF)
    const edgeFD = new GraphEdge(nodeF, nodeD)
    const edgeDG = new GraphEdge(nodeD, nodeG)

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCG)
      .addEdge(edgeAD)
      .addEdge(edgeAE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeDG)

    expect(graph.toString()).toBe('A,B,C,G,D,E,F')

    const enterNodeCallback = jest.fn()
    const leaveNodeCallback = jest.fn()

    // Traverse graphs without callbacks first to check default ones.
    depthFirstSearch(graph, nodeA)

    // Traverse graph with enterNode and leaveNode callbacks.
    depthFirstSearch(graph, nodeA, {
      enterNode: enterNodeCallback,
      leaveNode: leaveNodeCallback,
    })

    expect(enterNodeCallback).toHaveBeenCalledTimes(graph.getAllNodes().length)
    expect(leaveNodeCallback).toHaveBeenCalledTimes(graph.getAllNodes().length)

    const enterNodeParamsMap = [
      { currentNode: nodeA, previousNode: null },
      { currentNode: nodeB, previousNode: nodeA },
      { currentNode: nodeC, previousNode: nodeB },
      { currentNode: nodeG, previousNode: nodeC },
      { currentNode: nodeD, previousNode: nodeA },
      { currentNode: nodeE, previousNode: nodeA },
      { currentNode: nodeF, previousNode: nodeE },
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
      { currentNode: nodeG, previousNode: nodeC },
      { currentNode: nodeC, previousNode: nodeB },
      { currentNode: nodeB, previousNode: nodeA },
      { currentNode: nodeD, previousNode: nodeA },
      { currentNode: nodeF, previousNode: nodeE },
      { currentNode: nodeE, previousNode: nodeA },
      { currentNode: nodeA, previousNode: null },
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

  it('allow users to redefine node visiting logic', () => {
    const graph = new Graph(true)

    const nodeA = new GraphNode('A')
    const nodeB = new GraphNode('B')
    const nodeC = new GraphNode('C')
    const nodeD = new GraphNode('D')
    const nodeE = new GraphNode('E')
    const nodeF = new GraphNode('F')
    const nodeG = new GraphNode('G')

    const edgeAB = new GraphEdge(nodeA, nodeB)
    const edgeBC = new GraphEdge(nodeB, nodeC)
    const edgeCG = new GraphEdge(nodeC, nodeG)
    const edgeAD = new GraphEdge(nodeA, nodeD)
    const edgeAE = new GraphEdge(nodeA, nodeE)
    const edgeEF = new GraphEdge(nodeE, nodeF)
    const edgeFD = new GraphEdge(nodeF, nodeD)
    const edgeDG = new GraphEdge(nodeD, nodeG)

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCG)
      .addEdge(edgeAD)
      .addEdge(edgeAE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeDG)

    expect(graph.toString()).toBe('A,B,C,G,D,E,F')

    const enterNodeCallback = jest.fn()
    const leaveNodeCallback = jest.fn()

    depthFirstSearch(graph, nodeA, {
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
      { currentNode: nodeG, previousNode: nodeD },
      { currentNode: nodeE, previousNode: nodeA },
      { currentNode: nodeF, previousNode: nodeE },
      { currentNode: nodeD, previousNode: nodeF },
      { currentNode: nodeG, previousNode: nodeD },
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
      { currentNode: nodeG, previousNode: nodeD },
      { currentNode: nodeD, previousNode: nodeA },
      { currentNode: nodeG, previousNode: nodeD },
      { currentNode: nodeD, previousNode: nodeF },
      { currentNode: nodeF, previousNode: nodeE },
      { currentNode: nodeE, previousNode: nodeA },
      { currentNode: nodeA, previousNode: null },
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
})
