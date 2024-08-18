export default class FenwickTree {
  // Конструктор создает дерево Фенвика размера `size`,
  // однако, размер дерева `n+1`, потому что индексация начинается с `1`
  constructor(size) {
    this.size = size
    // Заполняем массив нулями
    this.tree = new Array(size + 1).fill(0)
  }

  // Прибавляет значение к существующему на указанной позиции
  increase(position, value) {
    if (position < 1 || position > this.size) {
      throw new Error('Позиция находится за пределами разрешенного диапазона')
    }

    // magic! :D
    for (let i = position; i <= this.size; i += i & -i) {
      this.tree[i] += value
    }

    return this
  }

  // Возвращает сумму от индекса 1 до указанной позиции
  query(position) {
    if (position < 1 || position > this.size) {
      throw new Error('Позиция находится за пределами разрешенного диапазона')
    }

    let sum = 0

    // magic! :D
    for (let i = position; i > 0; i -= i & -i) {
      sum += this.tree[i]
    }

    return sum
  }

  // Возвращает сумму от `leftIndex` до `rightIndex`
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
