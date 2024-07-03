import Item from './item'

export default class DisjointSet {
  constructor(cb) {
    this.cb = cb
    this.items = {}
  }

  makeSet(value) {
    const item = new Item(value, this.cb)

    if (!this.items[item.getKey()]) {
      this.items[item.getKey()] = item
    }

    return this
  }

  find(value) {
    const temp = new Item(value, this.cb)
    const item = this.items[temp.getKey()]
    return item ? item.getRoot().getKey() : null
  }

  union(value1, value2) {
    const root1 = this.find(value1)
    const root2 = this.find(value2)

    if (!root1 || !root2) {
      throw new Error('Одно или несколько значений отсутствуют во множестве!')
    }

    if (root1 === root2) {
      return this
    }

    const item1 = this.items[root1]
    const item2 = this.items[root2]

    if (item1.getRank() < item2.getRank()) {
      item2.addChild(item1)
      return this
    }

    item1.addChild(item2)
    return this
  }

  isSameSet(value1, value2) {
    const root1 = this.find(value1)
    const root2 = this.find(value2)

    if (!root1 || !root2) {
      throw new Error('Одно или несколько значений отсутствуют во множестве!')
    }

    return root1 === root2
  }
}
