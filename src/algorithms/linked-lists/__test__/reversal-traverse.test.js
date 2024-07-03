import LinkedList from '../../../data-structures/linked-list'
import reversalTraverse from '../reversal-traverse'

describe('reversalTraverse', () => {
  it('должен обходить связанный список в обратном порядке', () => {
    const linkedList = new LinkedList()

    linkedList.append(1).append(2).append(3)

    const traversedNodeValues = []
    const traversalCallback = (nodeValue) => {
      traversedNodeValues.push(nodeValue)
    }

    reversalTraverse(linkedList, traversalCallback)

    expect(traversedNodeValues).toEqual([3, 2, 1])
  })
})
