import DisjoinSet from '../../data-structures/disjoint-set/index'
import Graph from '../../data-structures/graph/index'
import QuickSort from '../sorting/quick-sort'

// Функция принимает граф
export default function kruskal(graph) {
  // При передаче направленного графа должно выбрасываться исключение
  if (graph.isDirected) {
    throw new Error(
      'Алгоритм Краскала работает только с ненаправленными графами',
    )
  }

  // Создаем новый граф, который будет содержать
  // минимальное остовное дерево исходного графа
  const minimumSpanningTree = new Graph()

  // Сортируем ребра графа в порядке возрастания веса
  const sortingCallbacks = {
    compareCallback: (a, b) => {
      if (a.weight === b.weight) {
        return 0
      }

      return a.weight < b.weight ? -1 : 1
    },
  }
  const sortedEdges = new QuickSort(sortingCallbacks).sort(graph.getAllEdges())

  // Создаем непересекающиеся одноэлементные множества для всех вершин графа
  const keyCb = (node) => node.getKey()
  const disjointSet = new DisjoinSet(keyCb)
  graph.getAllNodes().forEach((node) => disjointSet.makeSet(node))

  // Перебираем ребра графа, начиная с минимального, и пытаемся добавить их
  // в минимальное остовное дерево. Критерием добавления ребра является
  // формирование им цикла (если оно соединяет два узла одного подмножества)
  sortedEdges.forEach((edge) => {
    // Если добавление ребра не формирует цикл
    if (!disjointSet.isSameSet(edge.from, edge.to)) {
      // Объединяем два подмножества в одно
      disjointSet.union(edge.from, edge.to)

      // Добавляем ребро в дерево
      minimumSpanningTree.addEdge(edge)
    }
  })

  return minimumSpanningTree
}
