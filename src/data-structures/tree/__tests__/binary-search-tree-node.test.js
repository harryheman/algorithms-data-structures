import { BinarySearchTreeNode } from '../binary-search-tree'

describe('BinarySearchTreeNode', () => {
  it('должен создать узел', () => {
    const bstNode = new BinarySearchTreeNode(2)

    expect(bstNode.value).toBe(2)
    expect(bstNode.left).toBeNull()
    expect(bstNode.right).toBeNull()
  })

  it('должен установить значение узла', () => {
    const bstNode = new BinarySearchTreeNode()
    bstNode.insert(1)

    expect(bstNode.value).toBe(1)
    expect(bstNode.left).toBeNull()
    expect(bstNode.right).toBeNull()
  })

  it('должен добавить узлы в правильном порядке', () => {
    const bstNode = new BinarySearchTreeNode(2)
    const insertedNode1 = bstNode.insert(1)

    expect(insertedNode1.value).toBe(1)
    expect(bstNode.toString()).toBe('1,2')
    expect(bstNode.contains(1)).toBe(true)
    expect(bstNode.contains(3)).toBe(false)

    const insertedNode2 = bstNode.insert(3)

    expect(insertedNode2.value).toBe(3)
    expect(bstNode.toString()).toBe('1,2,3')
    expect(bstNode.contains(3)).toBe(true)
    expect(bstNode.contains(4)).toBe(false)

    bstNode.insert(7)

    expect(bstNode.toString()).toBe('1,2,3,7')
    expect(bstNode.contains(7)).toBe(true)
    expect(bstNode.contains(8)).toBe(false)

    bstNode.insert(4)

    expect(bstNode.toString()).toBe('1,2,3,4,7')
    expect(bstNode.contains(4)).toBe(true)
    expect(bstNode.contains(8)).toBe(false)

    bstNode.insert(6)

    expect(bstNode.toString()).toBe('1,2,3,4,6,7')
    expect(bstNode.contains(6)).toBe(true)
    expect(bstNode.contains(8)).toBe(false)
  })

  it('не должен добавлять дубликаты', () => {
    const bstNode = new BinarySearchTreeNode(2)
    bstNode.insert(1)

    expect(bstNode.toString()).toBe('1,2')
    expect(bstNode.contains(1)).toBe(true)
    expect(bstNode.contains(3)).toBe(false)

    bstNode.insert(1)

    expect(bstNode.toString()).toBe('1,2')
    expect(bstNode.contains(1)).toBe(true)
    expect(bstNode.contains(3)).toBe(false)
  })

  it('должен найти минимальный узел', () => {
    const node = new BinarySearchTreeNode(10)

    node.insert(20)
    node.insert(30)
    node.insert(5)
    node.insert(40)
    node.insert(1)

    expect(node.findMin()).not.toBeNull()
    expect(node.findMin().value).toBe(1)
  })

  it('должен добавить дополнительную информацию к узлам', () => {
    const node = new BinarySearchTreeNode(10)

    node.insert(20)
    const node1 = node.insert(30)
    node.insert(5)
    node.insert(40)
    const node2 = node.insert(1)

    node.meta.set('color', 'red')
    node1.meta.set('color', 'black')
    node2.meta.set('color', 'white')

    expect(node.meta.get('color')).toBe('red')

    expect(node.findMin()).not.toBeNull()
    expect(node.findMin().value).toBe(1)
    expect(node.findMin().meta.get('color')).toBe('white')
    expect(node.find(30).meta.get('color')).toBe('black')
  })

  it('должен найти узлы', () => {
    const node = new BinarySearchTreeNode(10)

    node.insert(20)
    node.insert(30)
    node.insert(5)
    node.insert(40)
    node.insert(1)

    expect(node.find(6)).toBeNull()
    expect(node.find(5)).not.toBeNull()
    expect(node.find(5).value).toBe(5)
  })

  it('должен удалить листовые узлы', () => {
    const bstRootNode = new BinarySearchTreeNode()

    bstRootNode.insert(10)
    bstRootNode.insert(20)
    bstRootNode.insert(5)

    expect(bstRootNode.toString()).toBe('5,10,20')

    const removed1 = bstRootNode.remove(5)
    expect(bstRootNode.toString()).toBe('10,20')
    expect(removed1).toBe(true)

    const removed2 = bstRootNode.remove(20)
    expect(bstRootNode.toString()).toBe('10')
    expect(removed2).toBe(true)
  })

  it('должен удалить узлы с одним потомком', () => {
    const bstRootNode = new BinarySearchTreeNode()

    bstRootNode.insert(10)
    bstRootNode.insert(20)
    bstRootNode.insert(5)
    bstRootNode.insert(30)

    expect(bstRootNode.toString()).toBe('5,10,20,30')

    bstRootNode.remove(20)
    expect(bstRootNode.toString()).toBe('5,10,30')

    bstRootNode.insert(1)
    expect(bstRootNode.toString()).toBe('1,5,10,30')

    bstRootNode.remove(5)
    expect(bstRootNode.toString()).toBe('1,10,30')
  })

  it('должен удалить узлы с двумя потомками', () => {
    const bstRootNode = new BinarySearchTreeNode()

    bstRootNode.insert(10)
    bstRootNode.insert(20)
    bstRootNode.insert(5)
    bstRootNode.insert(30)
    bstRootNode.insert(15)
    bstRootNode.insert(25)

    expect(bstRootNode.toString()).toBe('5,10,15,20,25,30')
    expect(bstRootNode.find(20).left.value).toBe(15)
    expect(bstRootNode.find(20).right.value).toBe(30)

    bstRootNode.remove(20)
    expect(bstRootNode.toString()).toBe('5,10,15,25,30')

    bstRootNode.remove(15)
    expect(bstRootNode.toString()).toBe('5,10,25,30')

    bstRootNode.remove(10)
    expect(bstRootNode.toString()).toBe('5,25,30')
    expect(bstRootNode.value).toBe(25)

    bstRootNode.remove(25)
    expect(bstRootNode.toString()).toBe('5,30')

    bstRootNode.remove(5)
    expect(bstRootNode.toString()).toBe('30')
  })

  it('должен удалить узел без предка', () => {
    const bstRootNode = new BinarySearchTreeNode()
    expect(bstRootNode.toString()).toBe('')

    bstRootNode.insert(1)
    bstRootNode.insert(2)
    expect(bstRootNode.toString()).toBe('1,2')

    bstRootNode.remove(1)
    expect(bstRootNode.toString()).toBe('2')

    bstRootNode.remove(2)
    expect(bstRootNode.toString()).toBe('')
  })

  it('должен удалить несуществующий узел', () => {
    const bstRootNode = new BinarySearchTreeNode()

    bstRootNode.insert(10)
    bstRootNode.insert(20)

    const removedNode = bstRootNode.remove(30)

    expect(removedNode).toBeNull()
  })

  it('должен добавить объекты', () => {
    const nodeValueComparatorCallback = (a, b) => {
      const normalizedA = a || { value: null }
      const normalizedB = b || { value: null }

      if (normalizedA.value === normalizedB.value) {
        return 0
      }

      return normalizedA.value < normalizedB.value ? -1 : 1
    }

    const obj1 = { key: 'obj1', value: 1, toString: () => 'obj1' }
    const obj2 = { key: 'obj2', value: 2, toString: () => 'obj2' }
    const obj3 = { key: 'obj3', value: 3, toString: () => 'obj3' }

    const bstNode = new BinarySearchTreeNode(obj2, nodeValueComparatorCallback)
    bstNode.insert(obj1)

    expect(bstNode.toString()).toBe('obj1,obj2')
    expect(bstNode.contains(obj1)).toBe(true)
    expect(bstNode.contains(obj3)).toBe(false)

    bstNode.insert(obj3)

    expect(bstNode.toString()).toBe('obj1,obj2,obj3')
    expect(bstNode.contains(obj3)).toBe(true)

    expect(bstNode.findMin().value).toEqual(obj1)
  })

  it('должен обнулить предка удаленного узла', () => {
    const rootNode = new BinarySearchTreeNode('foo')
    rootNode.insert('bar')
    const childNode = rootNode.find('bar')
    rootNode.remove('bar')

    expect(childNode.parent).toBeNull()
  })
})
