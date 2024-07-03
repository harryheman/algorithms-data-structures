import Queue from '../../data-structures/queue'

function initCallbacks(callbacks = {}) {
  const initiatedCallbacks = {}
  const stubCallback = () => {}
  const defaultAllowTraverseCallback = () => true
  initiatedCallbacks.allowTraverse =
    callbacks.allowTraverse || defaultAllowTraverseCallback
  initiatedCallbacks.enterNode = callbacks.enterNode || stubCallback
  initiatedCallbacks.leaveNode = callbacks.leaveNode || stubCallback
  return initiatedCallbacks
}

export default function breadthFirstSearch(root, callbacks) {
  const _callbacks = initCallbacks(callbacks)
  const queue = new Queue()

  queue.enqueue(root)

  while (!queue.isEmpty()) {
    const node = queue.dequeue()

    _callbacks.enterNode(node)

    if (node.left && _callbacks.allowTraverse(node, node.left)) {
      queue.enqueue(node.left)
    }

    if (node.right && _callbacks.allowTraverse(node, node.right)) {
      queue.enqueue(node.right)
    }

    _callbacks.leaveNode(node)
  }
}
