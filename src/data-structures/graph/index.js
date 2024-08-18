export default class Graph {
  constructor(isDirected = false) {
    // Индикатор направленности графа
    // (по умолчанию граф является ненаправленным)
    this.isDirected = isDirected
    // Узлы
    this.nodes = {}
    // Ребра
    this.edges = {}
  }

  // Добавляет узел в граф
  addNode(newNode) {
    this.nodes[newNode.getKey()] = newNode

    return this
  }

  // Возвращает узел по ключу
  getNodeByKey(key) {
    return this.nodes[key]
  }

  // Возвращает соседние узлы
  getNeighbors(node) {
    return node.getNeighbors()
  }

  // Возвращает значения всех узлов
  getAllNodes() {
    return Object.values(this.nodes)
  }

  // Возвращает значения всех ребер
  getAllEdges() {
    return Object.values(this.edges)
  }

  // Добавляет ребро в граф
  addEdge(newEdge) {
    // Пытаемся найти начальную и конечную вершины
    let from = this.getNodeByKey(newEdge.from.getKey())
    let to = this.getNodeByKey(newEdge.to.getKey())

    // Добавляем начальную вершину
    if (!from) {
      this.addNode(newEdge.from)
      from = this.getNodeByKey(newEdge.from.getKey())
    }

    // Добавляем конечную вершину
    if (!to) {
      this.addNode(newEdge.to)
      to = this.getNodeByKey(newEdge.to.getKey())
    }

    // Если ребро уже добавлено
    if (this.edges[newEdge.getKey()]) {
      throw new Error('Ребро уже добавлено!')
    } else {
      // Добавляем ребро
      this.edges[newEdge.getKey()] = newEdge
    }

    // Добавляем ребро в вершины
    if (this.isDirected) {
      from.addEdge(newEdge)
    } else {
      from.addEdge(newEdge)
      to.addEdge(newEdge)
    }

    return this
  }

  // Удаляет ребро из графа
  removeEdge(edge) {
    if (this.edges[edge.getKey()]) {
      // Удаляем ребро
      delete this.edges[edge.getKey()]
    } else {
      throw new Error('Ребро не найдено!')
    }

    // Пытаемся найти начальную и конечную вершины
    let from = this.getNodeByKey(edge.from.getKey())
    let to = this.getNodeByKey(edge.to.getKey())

    // Удаляем ребро из вершин
    from && from.removeEdge(edge)
    to && to.removeEdge(edge)
  }

  // Находит ребро в графе
  findEdge(from, to) {
    // Находим узел по начальному ключу
    const node = this.getNodeByKey(from.getKey())

    if (!node) return null

    // Пытаемся найти конечное ребро
    return node.findEdge(to)
  }

  // Возвращает вес графа
  getWeight() {
    // Суммируем веса всех ребер
    return this.getAllEdges().reduce((acc, edge) => acc + edge.weight, 0)
  }

  // Инвертирует граф
  reverse() {
    // Для каждого ребра
    this.getAllEdges().forEach((edge) => {
      // Удаляем ребро из графа
      this.removeEdge(edge)

      // Инвертируем ребро
      edge.reverse()

      // Снова добавляем ребро в граф
      this.addEdge(edge)
    })

    return this
  }

  // Возвращает индексы узлов в виде объекта
  getNodesIndices() {
    const indices = {}

    this.getAllNodes().forEach((node, index) => {
      indices[node.getKey()] = index
    })

    return indices
  }

  // Возвращает матрицу смежности
  getAdjacencyMatrix() {
    // Узлы
    const nodes = this.getAllNodes()
    // Индексы узлов
    const indices = this.getNodesIndices()
    // Инициализируем матрицу смежности (заполняем ее `null`)
    const matrix = new Array(nodes.length)
      .fill()
      .map(() => new Array(nodes.length).fill(null))

    // Формируем матрицу.
    // Перебираем узлы
    nodes.forEach((node, index) => {
      // Перебираем соседей узла
      node.getNeighbors().forEach((neighbor) => {
        // Индекс соседа
        const neighborIndex = indices[neighbor.getKey()]
        // [индекс узла][индекс соседа] = вес ребра
        matrix[index][neighborIndex] = this.findEdge(node, neighbor).weight
      })
    })

    return matrix
  }

  // Возвращает строковое представление графа
  toString() {
    return Object.keys(this.nodes).toString()
  }
}
