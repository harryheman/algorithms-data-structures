export default class Edge {
  constructor(from, to, weight = 0) {
    this.from = from
    this.to = to
    this.weight = weight
  }

  getKey() {
    const fromKey = this.from.getKey()
    const toKey = this.to.getKey()

    return `${fromKey}_${toKey}`
  }

  reverse() {
    const tmp = this.from
    this.from = this.to
    this.to = tmp

    return this
  }

  toString() {
    return this.getKey()
  }
}
