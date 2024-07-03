export default function traverse(list, cb) {
  let node = list.head

  while (node) {
    cb(node.value)
    node = node.next
  }
}
