import AvlTree from '../avl-tree'

describe('AvlTree', () => {
  it('должен выполнить простой левый-левый поворот', () => {
    const tree = new AvlTree()

    tree.insert(4)
    tree.insert(3)
    tree.insert(2)

    expect(tree.toString()).toBe('2,3,4')
    expect(tree.root.value).toBe(3)
    expect(tree.root.height).toBe(1)

    tree.insert(1)

    expect(tree.toString()).toBe('1,2,3,4')
    expect(tree.root.value).toBe(3)
    expect(tree.root.height).toBe(2)

    tree.insert(0)

    expect(tree.toString()).toBe('0,1,2,3,4')
    expect(tree.root.value).toBe(3)
    expect(tree.root.left.value).toBe(1)
    expect(tree.root.height).toBe(2)
  })

  it('должен выполнить сложный левый-левый поворот', () => {
    const tree = new AvlTree()

    tree.insert(30)
    tree.insert(20)
    tree.insert(40)
    tree.insert(10)

    expect(tree.root.value).toBe(30)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('10,20,30,40')

    tree.insert(25)
    expect(tree.root.value).toBe(30)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('10,20,25,30,40')

    tree.insert(5)
    expect(tree.root.value).toBe(20)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('5,10,20,25,30,40')
  })

  it('должен выполнить простой правый-правый поворот', () => {
    const tree = new AvlTree()

    tree.insert(2)
    tree.insert(3)
    tree.insert(4)

    expect(tree.toString()).toBe('2,3,4')
    expect(tree.root.value).toBe(3)
    expect(tree.root.height).toBe(1)

    tree.insert(5)

    expect(tree.toString()).toBe('2,3,4,5')
    expect(tree.root.value).toBe(3)
    expect(tree.root.height).toBe(2)

    tree.insert(6)

    expect(tree.toString()).toBe('2,3,4,5,6')
    expect(tree.root.value).toBe(3)
    expect(tree.root.right.value).toBe(5)
    expect(tree.root.height).toBe(2)
  })

  it('должен выполнить сложный правый-правый поворот', () => {
    const tree = new AvlTree()

    tree.insert(30)
    tree.insert(20)
    tree.insert(40)
    tree.insert(50)

    expect(tree.root.value).toBe(30)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('20,30,40,50')

    tree.insert(35)
    expect(tree.root.value).toBe(30)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('20,30,35,40,50')

    tree.insert(55)
    expect(tree.root.value).toBe(40)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('20,30,35,40,50,55')
  })

  it('должен выполнить левый-правый поворот', () => {
    const tree = new AvlTree()

    tree.insert(30)
    tree.insert(20)
    tree.insert(25)

    expect(tree.root.height).toBe(1)
    expect(tree.root.value).toBe(25)
    expect(tree.toString()).toBe('20,25,30')
  })

  it('должен выполнить правый-левый поворот', () => {
    const tree = new AvlTree()

    tree.insert(30)
    tree.insert(40)
    tree.insert(35)

    expect(tree.root.height).toBe(1)
    expect(tree.root.value).toBe(35)
    expect(tree.toString()).toBe('30,35,40')
  })

  it('должен создать сбалансированное дерево: кейс #1', () => {
    // @see: https://www.youtube.com/watch?v=rbg7Qf8GkQ4&t=839s
    const tree = new AvlTree()

    tree.insert(1)
    tree.insert(2)
    tree.insert(3)

    expect(tree.root.value).toBe(2)
    expect(tree.root.height).toBe(1)
    expect(tree.toString()).toBe('1,2,3')

    tree.insert(6)

    expect(tree.root.value).toBe(2)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('1,2,3,6')

    tree.insert(15)

    expect(tree.root.value).toBe(2)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('1,2,3,6,15')

    tree.insert(-2)

    expect(tree.root.value).toBe(2)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('-2,1,2,3,6,15')

    tree.insert(-5)

    expect(tree.root.value).toBe(2)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('-5,-2,1,2,3,6,15')

    tree.insert(-8)

    expect(tree.root.value).toBe(2)
    expect(tree.root.height).toBe(3)
    expect(tree.toString()).toBe('-8,-5,-2,1,2,3,6,15')
  })

  it('должен создать сбалансированное дерево: кейс #2', () => {
    // @see https://www.youtube.com/watch?v=7m94k2Qhg68
    const tree = new AvlTree()

    tree.insert(43)
    tree.insert(18)
    tree.insert(22)
    tree.insert(9)
    tree.insert(21)
    tree.insert(6)

    expect(tree.root.value).toBe(18)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('6,9,18,21,22,43')

    tree.insert(8)

    expect(tree.root.value).toBe(18)
    expect(tree.root.height).toBe(2)
    expect(tree.toString()).toBe('6,8,9,18,21,22,43')
  })

  it('должен выполнить левый-правый поворот с сохранением левого поддерева: кейс #1', () => {
    const tree = new AvlTree()

    tree.insert(30)
    tree.insert(15)
    tree.insert(40)
    tree.insert(10)
    tree.insert(18)
    tree.insert(35)
    tree.insert(45)
    tree.insert(5)
    tree.insert(12)

    expect(tree.toString()).toBe('5,10,12,15,18,30,35,40,45')
    expect(tree.root.height).toBe(3)

    tree.insert(11)

    expect(tree.toString()).toBe('5,10,11,12,15,18,30,35,40,45')
    expect(tree.root.height).toBe(3)
  })

  it('должен выполнить левый-правый поворот с сохранением левого поддерева: кейс #2', () => {
    const tree = new AvlTree()

    tree.insert(30)
    tree.insert(15)
    tree.insert(40)
    tree.insert(10)
    tree.insert(18)
    tree.insert(35)
    tree.insert(45)
    tree.insert(42)
    tree.insert(47)

    expect(tree.toString()).toBe('10,15,18,30,35,40,42,45,47')
    expect(tree.root.height).toBe(3)

    tree.insert(43)

    expect(tree.toString()).toBe('10,15,18,30,35,40,42,43,45,47')
    expect(tree.root.height).toBe(3)
  })

  it('должен удалить значения из дерева с правым-правым поворотом', () => {
    const tree = new AvlTree()

    tree.insert(10)
    tree.insert(20)
    tree.insert(30)
    tree.insert(40)

    expect(tree.toString()).toBe('10,20,30,40')

    tree.remove(10)

    expect(tree.toString()).toBe('20,30,40')
    expect(tree.root.value).toBe(30)
    expect(tree.root.left.value).toBe(20)
    expect(tree.root.right.value).toBe(40)
    expect(tree.root.balanceFactor).toBe(0)
  })

  it('должен удалить значения из дерева с левым-левым поворотом', () => {
    const tree = new AvlTree()

    tree.insert(10)
    tree.insert(20)
    tree.insert(30)
    tree.insert(5)

    expect(tree.toString()).toBe('5,10,20,30')

    tree.remove(30)

    expect(tree.toString()).toBe('5,10,20')
    expect(tree.root.value).toBe(10)
    expect(tree.root.left.value).toBe(5)
    expect(tree.root.right.value).toBe(20)
    expect(tree.root.balanceFactor).toBe(0)
  })

  it('должен выполнять балансировку дерева после удаления значений', () => {
    const tree = new AvlTree()

    tree.insert(1)
    tree.insert(2)
    tree.insert(3)
    tree.insert(4)
    tree.insert(5)
    tree.insert(6)
    tree.insert(7)
    tree.insert(8)
    tree.insert(9)

    expect(tree.toString()).toBe('1,2,3,4,5,6,7,8,9')
    expect(tree.root.value).toBe(4)
    expect(tree.root.height).toBe(3)
    expect(tree.root.balanceFactor).toBe(-1)

    tree.remove(8)

    expect(tree.root.value).toBe(4)
    expect(tree.root.balanceFactor).toBe(-1)

    tree.remove(9)

    expect(tree.contains(8)).toBeFalsy()
    expect(tree.contains(9)).toBeFalsy()
    expect(tree.toString()).toBe('1,2,3,4,5,6,7')
    expect(tree.root.value).toBe(4)
    expect(tree.root.height).toBe(2)
    expect(tree.root.balanceFactor).toBe(0)
  })
})
