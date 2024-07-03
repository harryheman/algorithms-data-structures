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

function depthFirstSearchRecursive(node, callbacks) {
  callbacks.enterNode(node)

  if (node.left && callbacks.allowTraverse(node, node.left)) {
    depthFirstSearchRecursive(node.left, callbacks)
  }

  if (node.right && callbacks.allowTraverse(node, node.right)) {
    depthFirstSearchRecursive(node.right, callbacks)
  }

  callbacks.leaveNode(node)
}

export default function depthFirstSearch(root, callbacks) {
  const _callbacks = initCallbacks(callbacks)
  depthFirstSearchRecursive(root, _callbacks)
}
