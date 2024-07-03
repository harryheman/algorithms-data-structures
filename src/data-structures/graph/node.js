import LinkedList from '../linked-list'

export default class Node {
  constructor(value) {
    if (!value) {
      throw new Error('Узел графа должен иметь значение!')
    }

    const edgeComparator = (a, b) => {
      if (a.getKey() === b.getKey()) {
        return 0
      }

      return a.getKey() < b.getKey() ? -1 : 1
    }

    this.value = value
    this.edges = new LinkedList(edgeComparator)
  }

  addEdge(edge) {
    this.edges.append(edge)

    return this
  }

  removeEdge(edge) {
    this.edges.remove(edge)

    return this
  }

  getNeighbors() {
    const edges = this.edges.toArray()

    const neighborsConverter = (node) => {
      return node.value.from === this ? node.value.to : node.value.from
    }

    return edges.map(neighborsConverter)
  }

  getEdges() {
    return this.edges.toArray().map((node) => node.value)
  }

  getDegree() {
    return this.edges.toArray().length
  }

  hasEdge(edge) {
    const _edge = this.edges.find({ cb: (node) => node === edge })

    return Boolean(_edge)
  }

  hasNeighbor(node) {
    const _node = this.edges.find({
      cb: (n) => n.to === node || n.from === node,
    })

    return Boolean(_node)
  }

  findEdge(node) {
    const cb = (n) => n.to === node || n.from === node

    const _node = this.edges.find({ cb })

    return _node ? _node.value : null
  }

  getKey() {
    return this.value
  }

  removeAllEdges() {
    this.getEdges().forEach((edge) => {
      this.removeEdge(edge)
    })

    return this
  }

  toString(cb) {
    return cb ? cb(this.value) : `${this.value}`
  }
}
