export default class MaxHeapManual {
  constructor(heap = []) {
    this.heap = []
    heap.forEach(this.add)
  }

  add(item) {
    this.heap.push(item)
    this.heapifyUp()
  }

  peek() {
    return this.heap[0]
  }

  isEmpty() {
    return this.heap.length === 0
  }

  toString() {
    return this.heap.toString()
  }

  poll() {
    if (this.isEmpty()) {
      return null
    }
    const item = this.heap[0]
    this.heap[0] = this.heap.pop()
    this.heapifyDown()
    return item
  }

  heapifyUp() {
    let index = this.heap.length - 1
    while (index > 0) {
      const parentIndex = this.getParentIndex(index)
      if (this.heap[parentIndex] >= this.heap[index]) break
      this.swap(parentIndex, index)
      index = parentIndex
    }
  }

  heapifyDown() {
    let index = 0

    while (
      (this.hasLeftChild(index) && this.heap[index] < this.leftChild(index)) ||
      (this.hasRightChild(index) && this.heap[index] < this.rightChild(index))
    ) {
      const leftIndex = this.getLeftChildIndex(index)
      const rightIndex = this.getRightChildIndex(index)
      const left = this.leftChild(index)
      const right = this.rightChild(index)

      if (this.hasLeftChild(index) && this.hasRightChild(index)) {
        if (left >= right) {
          this.swap(leftIndex, index)
          index = leftIndex
        } else {
          this.swap(rightIndex, index)
          index = rightIndex
        }
      } else if (this.hasLeftChild(index)) {
        this.swap(leftIndex, index)
        index = leftIndex
      }
    }
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heap.length
  }

  leftChild(parentIndex) {
    return this.heap[this.getLeftChildIndex(parentIndex)]
  }

  rightChild(parentIndex) {
    return this.heap[this.getRightChildIndex(parentIndex)]
  }

  swap(indexOne, indexTwo) {
    const tmp = this.heap[indexTwo]
    this.heap[indexTwo] = this.heap[indexOne]
    this.heap[indexOne] = tmp
  }
}
