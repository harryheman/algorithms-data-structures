import DoublyLinkedList, { Node } from '../doubly-linked-list'

describe('DoublyLinkedListNode', () => {
  it('должен создать узел с указанным значением', () => {
    const node = new Node(1)

    expect(node.value).toBe(1)
    expect(node.next).toBeNull()
    expect(node.prev).toBeNull()
  })

  it('должен создать узел с объектом в качестве значения', () => {
    const nodeValue = { value: 1, key: 'test' }
    const node = new Node(nodeValue)

    expect(node.value.value).toBe(1)
    expect(node.value.key).toBe('test')
    expect(node.next).toBeNull()
    expect(node.prev).toBeNull()
  })

  it('должен соединить узлы вместе', () => {
    const node2 = new Node(2)
    const node1 = new Node(1, node2)
    const node3 = new Node(10, node1, node2)

    expect(node1.next).toBeDefined()
    expect(node1.prev).toBeNull()
    expect(node2.next).toBeNull()
    expect(node2.prev).toBeNull()
    expect(node3.next).toBeDefined()
    expect(node3.prev).toBeDefined()
    expect(node1.value).toBe(1)
    expect(node1.next.value).toBe(2)
    expect(node3.next.value).toBe(1)
    expect(node3.prev.value).toBe(2)
  })

  it('должен преобразовать узел в строку', () => {
    const node = new Node(1)

    expect(node.toString()).toBe('1')

    node.value = 'string value'
    expect(node.toString()).toBe('string value')
  })

  it('должен преобразовать узел в строку с помощью кастомной функции', () => {
    const nodeValue = { value: 1, key: 'test' }
    const node = new Node(nodeValue)
    const toStringCallback = (value) =>
      `value: ${value.value}, key: ${value.key}`

    expect(node.toString(toStringCallback)).toBe('value: 1, key: test')
  })
})

describe('DoublyLinkedList', () => {
  it('должен создать пустой двусвязный список', () => {
    const linkedList = new DoublyLinkedList()
    expect(linkedList.toString()).toBe('')
  })

  it('должен добавить узлы в конец списка', () => {
    const linkedList = new DoublyLinkedList()

    expect(linkedList.head).toBeNull()
    expect(linkedList.tail).toBeNull()

    linkedList.append(1)
    linkedList.append(2)

    expect(linkedList.head.next.value).toBe(2)
    expect(linkedList.tail.prev.value).toBe(1)
    expect(linkedList.toString()).toBe('1,2')
  })

  it('должен добавить узлы в конец списка', () => {
    const linkedList = new DoublyLinkedList()

    linkedList.prepend(2)
    expect(linkedList.head.toString()).toBe('2')
    expect(linkedList.tail.toString()).toBe('2')

    linkedList.append(1)
    linkedList.prepend(3)

    expect(linkedList.head.next.next.prev).toBe(linkedList.head.next)
    expect(linkedList.tail.prev.next).toBe(linkedList.tail)
    expect(linkedList.tail.prev.value).toBe(2)
    expect(linkedList.toString()).toBe('3,2,1')
  })

  it('должен создать список из массива', () => {
    const linkedList = new DoublyLinkedList()
    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5])

    expect(linkedList.toString()).toBe('1,1,2,3,3,3,4,5')
  })

  it('должен удалить узлы по значениям', () => {
    const linkedList = new DoublyLinkedList()

    expect(linkedList.remove(5)).toBeNull()

    linkedList.append(1)
    linkedList.append(1)
    linkedList.append(2)
    linkedList.append(3)
    linkedList.append(3)
    linkedList.append(3)
    linkedList.append(4)
    linkedList.append(5)

    expect(linkedList.head.toString()).toBe('1')
    expect(linkedList.tail.toString()).toBe('5')

    const removedNode = linkedList.remove(3)
    expect(removedNode.value).toBe(3)
    expect(linkedList.tail.prev.prev.value).toBe(2)
    expect(linkedList.toString()).toBe('1,1,2,4,5')

    linkedList.remove(3)
    expect(linkedList.toString()).toBe('1,1,2,4,5')

    linkedList.remove(1)
    expect(linkedList.toString()).toBe('2,4,5')

    expect(linkedList.head.toString()).toBe('2')
    expect(linkedList.head.next.next).toBe(linkedList.tail)
    expect(linkedList.tail.prev.prev).toBe(linkedList.head)
    expect(linkedList.tail.toString()).toBe('5')

    linkedList.remove(5)
    expect(linkedList.toString()).toBe('2,4')

    expect(linkedList.head.toString()).toBe('2')
    expect(linkedList.tail.toString()).toBe('4')

    linkedList.remove(4)
    expect(linkedList.toString()).toBe('2')

    expect(linkedList.head.toString()).toBe('2')
    expect(linkedList.tail.toString()).toBe('2')
    expect(linkedList.head).toBe(linkedList.tail)

    linkedList.remove(2)
    expect(linkedList.toString()).toBe('')
  })

  it('должен удалить хвостовые узлы', () => {
    const linkedList = new DoublyLinkedList()

    expect(linkedList.removeTail()).toBeNull()

    linkedList.append(1)
    linkedList.append(2)
    linkedList.append(3)

    expect(linkedList.head.toString()).toBe('1')
    expect(linkedList.tail.toString()).toBe('3')

    const removedNode1 = linkedList.removeTail()

    expect(removedNode1.value).toBe(3)
    expect(linkedList.toString()).toBe('1,2')
    expect(linkedList.head.toString()).toBe('1')
    expect(linkedList.tail.toString()).toBe('2')

    const removedNode2 = linkedList.removeTail()

    expect(removedNode2.value).toBe(2)
    expect(linkedList.toString()).toBe('1')
    expect(linkedList.head.toString()).toBe('1')
    expect(linkedList.tail.toString()).toBe('1')

    const removedNode3 = linkedList.removeTail()

    expect(removedNode3.value).toBe(1)
    expect(linkedList.toString()).toBe('')
    expect(linkedList.head).toBeNull()
    expect(linkedList.tail).toBeNull()
  })

  it('должен удалить головные узлы', () => {
    const linkedList = new DoublyLinkedList()

    expect(linkedList.removeHead()).toBeNull()

    linkedList.append(1)
    linkedList.append(2)

    expect(linkedList.head.toString()).toBe('1')
    expect(linkedList.tail.toString()).toBe('2')

    const removedNode1 = linkedList.removeHead()

    expect(removedNode1.value).toBe(1)
    expect(linkedList.head.prev).toBeNull()
    expect(linkedList.toString()).toBe('2')
    expect(linkedList.head.toString()).toBe('2')
    expect(linkedList.tail.toString()).toBe('2')

    const removedNode2 = linkedList.removeHead()

    expect(removedNode2.value).toBe(2)
    expect(linkedList.toString()).toBe('')
    expect(linkedList.head).toBeNull()
    expect(linkedList.tail).toBeNull()
  })

  it('должна быть возможность сохранять в списке объекты', () => {
    const linkedList = new DoublyLinkedList()

    const nodeValue1 = { value: 1, key: 'key1' }
    const nodeValue2 = { value: 2, key: 'key2' }

    linkedList.append(nodeValue1).prepend(nodeValue2)

    const nodeStringifier = (value) => `${value.key}:${value.value}`

    expect(linkedList.toString(nodeStringifier)).toBe('key2:2,key1:1')
  })

  it('должен найти узлы по значениям', () => {
    const linkedList = new DoublyLinkedList()

    expect(linkedList.find({ value: 5 })).toBeNull()

    linkedList.append(1)
    expect(linkedList.find({ value: 1 })).toBeDefined()

    linkedList.append(2).append(3)

    const node = linkedList.find({ value: 2 })

    expect(node.value).toBe(2)
    expect(linkedList.find({ value: 5 })).toBeNull()
  })

  it('должен найти узлы с помощью кастомной функции', () => {
    const linkedList = new DoublyLinkedList()

    linkedList
      .append({ value: 1, key: 'test1' })
      .append({ value: 2, key: 'test2' })
      .append({ value: 3, key: 'test3' })

    const node = linkedList.find({ cb: (value) => value.key === 'test2' })

    expect(node).toBeDefined()
    expect(node.value.value).toBe(2)
    expect(node.value.key).toBe('test2')
    expect(linkedList.find({ cb: (value) => value.key === 'test5' })).toBeNull()
  })

  it('должен найти узлы с помощью кастомной функции сравнения', () => {
    const comparatorFunction = (a, b) => {
      if (a.customValue === b.customValue) {
        return 0
      }

      return a.customValue < b.customValue ? -1 : 1
    }

    const linkedList = new DoublyLinkedList(comparatorFunction)

    linkedList
      .append({ value: 1, customValue: 'test1' })
      .append({ value: 2, customValue: 'test2' })
      .append({ value: 3, customValue: 'test3' })

    const node = linkedList.find({
      value: { value: 2, customValue: 'test2' },
    })

    expect(node).toBeDefined()
    expect(node.value.value).toBe(2)
    expect(node.value.customValue).toBe('test2')
    expect(linkedList.find({ value: 2, customValue: 'test5' })).toBeNull()
  })

  it('должен инвертировать список', () => {
    const linkedList = new DoublyLinkedList()

    // Добавляем тестовые значения в список
    linkedList.append(1).append(2).append(3).append(4)

    expect(linkedList.toString()).toBe('1,2,3,4')
    expect(linkedList.head.value).toBe(1)
    expect(linkedList.tail.value).toBe(4)

    // Инвертируем список
    linkedList.reverse()

    expect(linkedList.toString()).toBe('4,3,2,1')

    expect(linkedList.head.prev).toBeNull()
    expect(linkedList.head.value).toBe(4)
    expect(linkedList.head.next.value).toBe(3)
    expect(linkedList.head.next.next.value).toBe(2)
    expect(linkedList.head.next.next.next.value).toBe(1)

    expect(linkedList.tail.next).toBeNull()
    expect(linkedList.tail.value).toBe(1)
    expect(linkedList.tail.prev.value).toBe(2)
    expect(linkedList.tail.prev.prev.value).toBe(3)
    expect(linkedList.tail.prev.prev.prev.value).toBe(4)

    // Инвертируем список обратно в начальное состояние
    linkedList.reverse()

    expect(linkedList.toString()).toBe('1,2,3,4')

    expect(linkedList.head.prev).toBeNull()
    expect(linkedList.head.value).toBe(1)
    expect(linkedList.head.next.value).toBe(2)
    expect(linkedList.head.next.next.value).toBe(3)
    expect(linkedList.head.next.next.next.value).toBe(4)

    expect(linkedList.tail.next).toBeNull()
    expect(linkedList.tail.value).toBe(4)
    expect(linkedList.tail.prev.value).toBe(3)
    expect(linkedList.tail.prev.prev.value).toBe(2)
    expect(linkedList.tail.prev.prev.prev.value).toBe(1)
  })
})
