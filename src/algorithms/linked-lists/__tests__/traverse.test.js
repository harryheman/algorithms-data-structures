import LinkedList from '../../../data-structures/linked-list'
import traverse from '../traverse'

describe('traverse', () => {
  it('должен обойти связный список в прямом порядке', () => {
    const linkedList = new LinkedList()

    linkedList.append(1).append(2).append(3)

    const nodeValues = []
    const traversalCallback = (nodeValue) => {
      nodeValues.push(nodeValue)
    }

    traverse(linkedList, traversalCallback)

    expect(nodeValues).toEqual([1, 2, 3])
  })
})
