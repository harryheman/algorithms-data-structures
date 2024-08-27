import Item from './item'

export default class DisjointSet {
  constructor(cb) {
    // Кастомная функция извлечения ключа (значения) узла
    this.cb = cb
    // Непересекающиеся подмножества
    this.items = {}
  }

  // Создает подмножество
  makeSet(value) {
    // Создаем выделенный элемент
    const item = new Item(value, this.cb)

    // Добавляем подмножество в список
    if (!this.items[item.getKey()]) {
      this.items[item.getKey()] = item
    }

    return this
  }

  // Ищет выделенный элемент
  find(value) {
    const temp = new Item(value, this.cb)
    const item = this.items[temp.getKey()]
    return item ? item.getRoot().getKey() : null
  }

  // Объединяет подмножества
  union(value1, value2) {
    const root1 = this.find(value1)
    const root2 = this.find(value2)

    if (!root1 || !root2) {
      throw new Error('Одно или оба значения отсутствуют!')
    }

    if (root1 === root2) {
      return this
    }

    const item1 = this.items[root1]
    const item2 = this.items[root2]

    // Определяем, какое подмножество имеет больший ранг.
    // Подмножество с меньшим рангом становится потомком подмножества с большим рангом
    if (item1.getRank() < item2.getRank()) {
      item2.addChild(item1)
      return this
    }

    item1.addChild(item2)
    return this
  }

  // Определяет, принадлежат ли значения к одному множеству
  isSameSet(value1, value2) {
    const root1 = this.find(value1)
    const root2 = this.find(value2)

    if (!root1 || !root2) {
      throw new Error('Одно или оба значения отсутствуют!')
    }

    return root1 === root2
  }
}
