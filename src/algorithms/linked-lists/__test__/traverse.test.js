import LinkedList from '../../../data-structures/linked-list'
import traverse from '../traverse'

describe('traverse', () => {
  it('должен обходить связанный список', () => {
    const linkedList = new LinkedList()

    linkedList.append(1).append(2).append(3)

    const traversedNodeValues = []
    const traversalCallback = (nodeValue) => {
      traversedNodeValues.push(nodeValue)
    }

    traverse(linkedList, traversalCallback)

    expect(traversedNodeValues).toEqual([1, 2, 3])
  })
})
