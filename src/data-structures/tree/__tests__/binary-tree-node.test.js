import BinaryTreeNode from '../binary-tree-node'

describe('BinaryTreeNode', () => {
  it('должен создать узел', () => {
    const node = new BinaryTreeNode()

    expect(node).toBeDefined()

    expect(node.value).toBeNull()
    expect(node.left).toBeNull()
    expect(node.right).toBeNull()

    const leftNode = new BinaryTreeNode(1)
    const rightNode = new BinaryTreeNode(3)
    const rootNode = new BinaryTreeNode(2)

    rootNode.setLeft(leftNode).setRight(rightNode)

    expect(rootNode.value).toBe(2)
    expect(rootNode.left.value).toBe(1)
    expect(rootNode.right.value).toBe(3)
  })

  it('должен установить предка', () => {
    const leftNode = new BinaryTreeNode(1)
    const rightNode = new BinaryTreeNode(3)
    const rootNode = new BinaryTreeNode(2)

    rootNode.setLeft(leftNode).setRight(rightNode)

    expect(rootNode.parent).toBeNull()
    expect(rootNode.left.parent.value).toBe(2)
    expect(rootNode.right.parent.value).toBe(2)
    expect(rootNode.right.parent).toEqual(rootNode)
  })

  it('должен обойти дерево', () => {
    const leftNode = new BinaryTreeNode(1)
    const rightNode = new BinaryTreeNode(3)
    const rootNode = new BinaryTreeNode(2)

    rootNode.setLeft(leftNode).setRight(rightNode)

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3])

    expect(rootNode.toString()).toBe('1,2,3')
  })

  it('должен удалить потомков', () => {
    const leftNode = new BinaryTreeNode(1)
    const rightNode = new BinaryTreeNode(3)
    const rootNode = new BinaryTreeNode(2)

    rootNode.setLeft(leftNode).setRight(rightNode)

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3])

    expect(rootNode.removeChild(rootNode.left)).toBe(true)
    expect(rootNode.traverseInOrder()).toEqual([2, 3])

    expect(rootNode.removeChild(rootNode.right)).toBe(true)
    expect(rootNode.traverseInOrder()).toEqual([2])

    expect(rootNode.removeChild(rootNode.right)).toBe(false)
    expect(rootNode.traverseInOrder()).toEqual([2])
  })

  it('должен заменить потомков', () => {
    const leftNode = new BinaryTreeNode(1)
    const rightNode = new BinaryTreeNode(3)
    const rootNode = new BinaryTreeNode(2)

    rootNode.setLeft(leftNode).setRight(rightNode)

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3])

    const replacementNode = new BinaryTreeNode(5)
    rightNode.setRight(replacementNode)

    expect(rootNode.traverseInOrder()).toEqual([1, 2, 3, 5])

    expect(rootNode.replaceChild(rootNode.right, rootNode.right.right)).toBe(
      true,
    )
    expect(rootNode.right.value).toBe(5)
    expect(rootNode.right.right).toBeNull()
    expect(rootNode.traverseInOrder()).toEqual([1, 2, 5])

    expect(rootNode.replaceChild(rootNode.right, rootNode.right.right)).toBe(
      false,
    )
    expect(rootNode.traverseInOrder()).toEqual([1, 2, 5])

    expect(rootNode.replaceChild(rootNode.right, replacementNode)).toBe(true)
    expect(rootNode.traverseInOrder()).toEqual([1, 2, 5])

    expect(rootNode.replaceChild(rootNode.left, replacementNode)).toBe(true)
    expect(rootNode.traverseInOrder()).toEqual([5, 2, 5])

    expect(
      rootNode.replaceChild(new BinaryTreeNode(), new BinaryTreeNode()),
    ).toBe(false)
  })

  it('должен вычислить высоту узлов', () => {
    const root = new BinaryTreeNode(1)
    const left = new BinaryTreeNode(3)
    const right = new BinaryTreeNode(2)
    const grandLeft = new BinaryTreeNode(5)
    const grandRight = new BinaryTreeNode(6)
    const grandGrandLeft = new BinaryTreeNode(7)

    expect(root.height).toBe(0)
    expect(root.balanceFactor).toBe(0)

    root.setLeft(left).setRight(right)

    expect(root.height).toBe(1)
    expect(left.height).toBe(0)
    expect(root.balanceFactor).toBe(0)

    left.setLeft(grandLeft).setRight(grandRight)

    expect(root.height).toBe(2)
    expect(left.height).toBe(1)
    expect(grandLeft.height).toBe(0)
    expect(grandRight.height).toBe(0)
    expect(root.balanceFactor).toBe(1)

    grandLeft.setLeft(grandGrandLeft)

    expect(root.height).toBe(3)
    expect(left.height).toBe(2)
    expect(grandLeft.height).toBe(1)
    expect(grandRight.height).toBe(0)
    expect(grandGrandLeft.height).toBe(0)
    expect(root.balanceFactor).toBe(2)
  })

  it('должен также вычислить высоту правых узлов', () => {
    const root = new BinaryTreeNode(1)
    const right = new BinaryTreeNode(2)

    root.setRight(right)

    expect(root.height).toBe(1)
    expect(right.height).toBe(0)
    expect(root.balanceFactor).toBe(-1)
  })

  it('должен обнулить левый и правый узлы', () => {
    const root = new BinaryTreeNode(2)
    const left = new BinaryTreeNode(1)
    const right = new BinaryTreeNode(3)

    root.setLeft(left)
    root.setRight(right)

    expect(root.left.value).toBe(1)
    expect(root.right.value).toBe(3)

    root.setLeft(null)
    root.setRight(null)

    expect(root.left).toBeNull()
    expect(root.right).toBeNull()
  })

  it('должен добавить объекты', () => {
    const obj1 = { key: 'object_1', toString: () => 'object_1' }
    const obj2 = { key: 'object_2' }

    const node1 = new BinaryTreeNode(obj1)
    const node2 = new BinaryTreeNode(obj2)

    node1.setLeft(node2)

    expect(node1.value).toEqual(obj1)
    expect(node2.value).toEqual(obj2)
    expect(node1.left.value).toEqual(obj2)

    node1.removeChild(node2)

    expect(node1.value).toEqual(obj1)
    expect(node2.value).toEqual(obj2)
    expect(node1.left).toBeNull()

    expect(node1.toString()).toBe('object_1')
    expect(node2.toString()).toBe('[object Object]')
  })

  it('должен добавить дополнительную информацию в узлы', () => {
    const redNode = new BinaryTreeNode(1)
    const blackNode = new BinaryTreeNode(2)

    redNode.meta.set('color', 'red')
    blackNode.meta.set('color', 'black')

    expect(redNode.meta.get('color')).toBe('red')
    expect(blackNode.meta.get('color')).toBe('black')
  })

  it('должен найти правильного дядю', () => {
    const grandParent = new BinaryTreeNode('grand-parent')
    const parent = new BinaryTreeNode('parent')
    const uncle = new BinaryTreeNode('uncle')
    const child = new BinaryTreeNode('child')

    expect(grandParent.uncle).toBeNull()
    expect(parent.uncle).toBeNull()

    grandParent.setLeft(parent)

    expect(parent.uncle).toBeNull()
    expect(child.uncle).toBeNull()

    parent.setLeft(child)

    expect(child.uncle).toBeNull()

    grandParent.setRight(uncle)

    expect(parent.uncle).toBeNull()
    expect(child.uncle).toBeDefined()
    expect(child.uncle).toEqual(uncle)
  })

  it('должен найти левого дядю', () => {
    const grandParent = new BinaryTreeNode('grand-parent')
    const parent = new BinaryTreeNode('parent')
    const uncle = new BinaryTreeNode('uncle')
    const child = new BinaryTreeNode('child')

    expect(grandParent.uncle).toBeNull()
    expect(parent.uncle).toBeNull()

    grandParent.setRight(parent)

    expect(parent.uncle).toBeNull()
    expect(child.uncle).toBeNull()

    parent.setRight(child)

    expect(child.uncle).toBeNull()

    grandParent.setLeft(uncle)

    expect(parent.uncle).toBeNull()
    expect(child.uncle).toBeDefined()
    expect(child.uncle).toEqual(uncle)
  })

  it('должен установить значения узла', () => {
    const node = new BinaryTreeNode('initial_value')

    expect(node.value).toBe('initial_value')

    node.setValue('new_value')

    expect(node.value).toBe('new_value')
  })

  it('должен копировать узел', () => {
    const root = new BinaryTreeNode('root')
    const left = new BinaryTreeNode('left')
    const right = new BinaryTreeNode('right')

    root.setLeft(left).setRight(right)

    expect(root.toString()).toBe('left,root,right')

    const newRoot = new BinaryTreeNode('new_root')
    const newLeft = new BinaryTreeNode('new_left')
    const newRight = new BinaryTreeNode('new_right')

    newRoot.setLeft(newLeft).setRight(newRight)

    expect(newRoot.toString()).toBe('new_left,new_root,new_right')

    BinaryTreeNode.copyNode(root, newRoot)

    expect(root.toString()).toBe('left,root,right')
    expect(newRoot.toString()).toBe('left,root,right')
  })
})
