class Node {
  constructor(key, val, prev = null, next = null) {
    this.key = key
    this.val = val
    this.prev = prev
    this.next = next
  }
}

export default class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.nodesMap = {}
    this.size = 0
    this.head = new Node()
    this.tail = new Node()
  }

  get(key) {
    const node = this.nodesMap[key]
    if (!node) return null
    this.promote(node)
    return node.val
  }

  set(key, val) {
    if (this.nodesMap[key]) {
      const node = this.nodesMap[key]
      node.val = val
      this.promote(node)
    } else {
      const node = new Node(key, val)
      this.append(node)
    }
  }

  /**
   * Перемещает узел в конец связанного списка.
   * Это означает, что узел используется наиболее часто.
   * Это также снижает вероятность удаления такого узла из кэша
   */
  promote(node) {
    this.evict(node)
    this.append(node)
  }

  append(node) {
    this.nodesMap[node.key] = node

    if (!this.head.next) {
      // первый узел
      this.head.next = node
      this.tail.prev = node
      node.prev = this.head
      node.next = this.tail
    } else {
      // добавляем в существующий хвост
      const oldTail = this.tail.prev
      oldTail.next = node
      node.prev = oldTail
      node.next = this.tail
      this.tail.prev = node
    }

    this.size += 1
    if (this.size > this.capacity) {
      this.evict(this.head.next)
    }
  }

  evict(node) {
    delete this.nodesMap[node.key]
    this.size -= 1

    const prev = node.prev
    const next = node.next

    // имеется только один узел
    if (prev === this.head && next === this.tail) {
      this.head.next = null
      this.tail.prev = null
      this.size = 0
      return
    }

    // это головной узел
    if (prev === this.head) {
      next.prev = this.head
      this.head.next = next
      return
    }

    // это хвостовой узел
    if (next === this.tail) {
      prev.next = this.tail
      this.tail.prev = prev
      return
    }

    // узел в середине
    prev.next = next
    next.prev = prev
  }
}
