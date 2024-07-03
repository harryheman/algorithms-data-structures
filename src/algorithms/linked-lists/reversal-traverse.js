function reversalTraverseRecursive(node, cb) {
  if (node) {
    reversalTraverseRecursive(node.next, cb)
    cb(node.value)
  }
}

export default function reversalTraverse(list, cb) {
  reversalTraverseRecursive(list.head, cb)
}
