function initCallbacks(callbacks = {}) {
  const initiatedCallbacks = {}
  const stubCallback = () => {}
  const defaultAllowTraverseCallback = (() => {
    const traversed = {}
    return ({ nextNode }) => {
      if (!traversed[nextNode.getKey()]) {
        traversed[nextNode.getKey()] = true
        return true
      }
      return false
    }
  })()
  initiatedCallbacks.allowTraverse =
    callbacks.allowTraverse || defaultAllowTraverseCallback
  initiatedCallbacks.enterNode = callbacks.enterNode || stubCallback
  initiatedCallbacks.leaveNode = callbacks.leaveNode || stubCallback
  return initiatedCallbacks
}

function depthFirstSearchRecursive(
  graph,
  currentNode,
  previousNode,
  callbacks,
) {
  callbacks.enterNode({ currentNode, previousNode })

  graph.getNeighbors(currentNode).forEach((nextNode) => {
    if (callbacks.allowTraverse({ previousNode, currentNode, nextNode })) {
      depthFirstSearchRecursive(graph, nextNode, currentNode, callbacks)
    }
  })

  callbacks.leaveNode({ currentNode, previousNode })
}

export default function depthFirstSearch(graph, startNode, callbacks) {
  const _callbacks = initCallbacks(callbacks)
  depthFirstSearchRecursive(graph, startNode, null, _callbacks)
}
