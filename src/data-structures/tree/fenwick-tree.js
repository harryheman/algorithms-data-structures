export default class FenwickTree {
  constructor(size) {
    this.size = size
    this.tree = new Array(size + 1).fill(0)
  }

  increase(position, value) {
    if (position < 1 || position > this.size) {
      throw new Error('Позиция находится за пределами разрешенного диапазона')
    }

    for (let i = position; i <= this.size; i += i & -i) {
      this.tree[i] += value
    }

    return this
  }

  query(position) {
    if (position < 1 || position > this.size) {
      throw new Error('Позиция находится за пределами разрешенного диапазона')
    }

    let sum = 0

    for (let i = position; i > 0; i -= i & -i) {
      sum += this.tree[i]
    }

    return sum
  }

  queryRange(leftIndex, rightIndex) {
    if (leftIndex > rightIndex) {
      throw new Error('Левый индекс не может превышать правый')
    }

    if (leftIndex === 1) {
      return this.query(rightIndex)
    }

    return this.query(rightIndex) - this.query(leftIndex - 1)
  }
}
