import LinkedList from '../../../data-structures/linked-list'
import reversalTraverse from '../reversal-traverse'

describe('reversalTraverse', () => {
  it('должен обойти связный список в обратном порядке', () => {
    const linkedList = new LinkedList()

    linkedList.append(1).append(2).append(3)

    const nodeValues = []
    const traversalCallback = (nodeValue) => {
      nodeValues.push(nodeValue)
    }

    reversalTraverse(linkedList, traversalCallback)

    expect(nodeValues).toEqual([3, 2, 1])
  })
})
