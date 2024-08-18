// Связный список
import LinkedList from '../linked-list'

// Функция сравнения ребер
const edgeComparator = (a, b) => {
  if (a.getKey() === b.getKey()) {
    return 0
  }

  return a.getKey() < b.getKey() ? -1 : 1
}

export default class Node {
  constructor(value) {
    if (!value) {
      throw new Error('Узел графа должен иметь значение!')
    }

    // Значение узла
    this.value = value
    // Связный список ребер
    this.edges = new LinkedList(edgeComparator)
  }

  // Добавляет ребро в список
  addEdge(edge) {
    this.edges.append(edge)

    return this
  }

  // Удаляет ребро из списка
  removeEdge(edge) {
    this.edges.remove(edge)

    return this
  }

  // Удаляет все ребра
  removeAllEdges() {
    this.getEdges().forEach((edge) => {
      this.removeEdge(edge)
    })

    return this
  }

  // Возвращает список соседних узлов
  getNeighbors() {
    const edges = this.edges.toArray()

    return edges.map((node) =>
      node.value.from === this ? node.value.to : node.value.from,
    )
  }

  // Возвращает список ребер в виде массива значений
  getEdges() {
    return this.edges.toArray().map((node) => node.value)
  }

  // Возвращает длину (глубину) узла
  getDegree() {
    return this.edges.toArray().length
  }

  // Возвращает значение узла
  getKey() {
    return this.value
  }

  // Определяет наличие ребра
  hasEdge(edge) {
    const _edge = this.edges.find({ cb: (node) => node === edge })

    return Boolean(_edge)
  }

  // Определяет наличие соседа
  hasNeighbor(node) {
    const _node = this.edges.find({
      cb: (n) => n.to === node || n.from === node,
    })

    return Boolean(_node)
  }

  // Выполняет поиск ребра по узлу
  findEdge(node) {
    const _node = this.edges.find({
      cb: (n) => n.to === node || n.from === node,
    })

    return _node ? _node.value : null
  }

  // Возвращает строковое представление узла.
  // Принимает кастомную функцию стрингификации
  toString(cb) {
    return cb ? cb(this.value) : `${this.value}`
  }
}
