import Queue from '../../data-structures/queue'

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

export default function breadthFirstSearch(graph, startNode, callbacks) {
  const _callbacks = initCallbacks(callbacks)
  const queue = new Queue()

  queue.enqueue(startNode)

  let previousNode = null

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue()

    _callbacks.enterNode({ currentNode, previousNode })

    graph.getNeighbors(currentNode).forEach((nextNode) => {
      if (_callbacks.allowTraverse({ previousNode, currentNode, nextNode })) {
        queue.enqueue(nextNode)
      }
    })

    _callbacks.leaveNode({ currentNode, previousNode })

    // Запоминаем текущий узел перед следующей итерацией
    previousNode = currentNode
  }
}
