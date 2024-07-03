export default class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected
    this.nodes = {}
    this.edges = {}
  }

  addNode(newNode) {
    this.nodes[newNode.getKey()] = newNode

    return this
  }

  getNodeByKey(key) {
    return this.nodes[key]
  }

  getNeighbors(node) {
    return node.getNeighbors()
  }

  getAllNodes() {
    return Object.values(this.nodes)
  }

  getAllEdges() {
    return Object.values(this.edges)
  }

  addEdge(newEdge) {
    // пытаемся найти начальную и конечную вершины
    let from = this.getNodeByKey(newEdge.from.getKey())
    let to = this.getNodeByKey(newEdge.to.getKey())

    // добавляем начальную вершину
    if (!from) {
      this.addNode(newEdge.from)
      from = this.getNodeByKey(newEdge.from.getKey())
    }

    // добавляем конечную вершину
    if (!to) {
      this.addNode(newEdge.to)
      to = this.getNodeByKey(newEdge.to.getKey())
    }

    // проверяем, что ребро уже добавлено
    if (this.edges[newEdge.getKey()]) {
      throw new Error('Ребро уже добавлено!')
    } else {
      this.edges[newEdge.getKey()] = newEdge
    }

    // добавляем ребро в вершины
    if (this.isDirected) {
      from.addEdge(newEdge)
    } else {
      from.addEdge(newEdge)
      to.addEdge(newEdge)
    }

    return this
  }

  removeEdge(edge) {
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()]
    } else {
      throw new Error('Ребро не найдено!')
    }

    // пытаемся найти начальную и конечную вершины
    let from = this.getNodeByKey(edge.from.getKey())
    let to = this.getNodeByKey(edge.to.getKey())

    from && from.removeEdge(edge)
    to && to.removeEdge(edge)
  }

  findEdge(from, to) {
    const node = this.getNodeByKey(from.getKey())

    if (!node) return null

    return node.findEdge(to)
  }

  getWeight() {
    return this.getAllEdges().reduce((acc, edge) => acc + edge.weight, 0)
  }

  reverse() {
    this.getAllEdges().forEach((edge) => {
      this.removeEdge(edge)

      edge.reverse()

      this.addEdge(edge)
    })

    return this
  }

  getNodesIndices() {
    const indices = {}

    this.getAllNodes().forEach((node, index) => {
      indices[node.getKey()] = index
    })

    return indices
  }

  getAdjacencyMatrix() {
    const nodes = this.getAllNodes()
    const indices = this.getNodesIndices()
    const matrix = new Array(nodes.length)
      .fill()
      .map(() => new Array(nodes.length).fill(null))

    nodes.forEach((node, index) => {
      node.getNeighbors().forEach((neighbor) => {
        const neighborIndex = indices[neighbor.getKey()]
        matrix[index][neighborIndex] = this.findEdge(node, neighbor).weight
      })
    })

    return matrix
  }

  toString() {
    return Object.keys(this.nodes).toString()
  }
}
