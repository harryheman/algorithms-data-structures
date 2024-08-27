// Узел
class Node {
  constructor(key, val, prev = null, next = null) {
    // Ключ
    this.key = key
    // Значение
    this.val = val
    // Ссылка на предыдущий узел
    this.prev = prev
    // Ссылка на следующий узел
    this.next = next
  }
}

// КАД
export default class LRUCache {
  // Конструктор принимает емкость кэша
  constructor(capacity) {
    // Максимальный размер кэша
    this.capacity = capacity
    // Кэшированные узлы
    this.nodesMap = {}
    // Текущий размер кэша
    this.size = 0
    // Головной узел
    this.head = new Node()
    // Хвостовой узел
    this.tail = new Node()
  }

  // Возвращает значение по ключу
  get(key) {
    const node = this.nodesMap[key]
    if (!node) return null
    // Обновляем "приоритет" узла
    this.promote(node)
    return node.val
  }

  // Добавляет узел в кэш
  set(key, val) {
    if (this.nodesMap[key]) {
      // Обновляем значение существующего узла
      const node = this.nodesMap[key]
      node.val = val
      this.promote(node)
    } else {
      // Добавляем новый узел
      const node = new Node(key, val)
      this.append(node)
    }
  }

  /**
   * Перемещает узел в конец связного списка.
   * Это означает, что узел используется наиболее часто.
   * Это также снижает вероятность удаления такого узла из кэша
   */
  promote(node) {
    this.evict(node)
    this.append(node)
  }

  // Перемещает узел в конец связного списка
  append(node) {
    this.nodesMap[node.key] = node

    if (!this.head.next) {
      // Первый узел
      this.head.next = node
      this.tail.prev = node
      node.prev = this.head
      node.next = this.tail
    } else {
      // Добавляем узел в конец
      const oldTail = this.tail.prev
      oldTail.next = node
      node.prev = oldTail
      node.next = this.tail
      this.tail.prev = node
    }

    // Увеличиваем текущий размер кэша
    this.size += 1
    // Если достигнут максимальный размер кэша,
    // то удаляем первый узел
    if (this.size > this.capacity) {
      this.evict(this.head.next)
    }
  }

  // Удаляет (вытесняет) узел из кэша
  evict(node) {
    delete this.nodesMap[node.key]
    // Уменьшаем текущий размер кэша
    this.size -= 1

    const prev = node.prev
    const next = node.next

    // Имеется только один узел
    if (prev === this.head && next === this.tail) {
      this.head.next = null
      this.tail.prev = null
      this.size = 0
      return
    }

    // Это головной узел
    if (prev === this.head) {
      next.prev = this.head
      this.head.next = next
      return
    }

    // Это хвостовой узел
    if (next === this.tail) {
      prev.next = this.tail
      this.tail.prev = prev
      return
    }

    // Это узел в середине списка
    prev.next = next
    next.prev = prev
  }
}
