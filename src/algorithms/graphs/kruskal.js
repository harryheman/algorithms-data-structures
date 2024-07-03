import Graph from '../../data-structures/graph/index'
import QuickSort from '../sorting/quick-sort'
import DisjoinSet from '../../data-structures/disjoint-set/index'

export default function kruskal(graph) {
  if (graph.isDirected) {
    throw new Error(
      'Алгоритм Краскала работает только с ненаправленными графами!',
    )
  }

  const minimumSpanningTree = new Graph()

  const sortingCallbacks = {
    compareCallback: (a, b) => {
      if (a.weight === b.weight) {
        return 1
      }

      return a.weight <= b.weight ? -1 : 1
    },
  }
  const sortedEdges = new QuickSort(sortingCallbacks).sort(graph.getAllEdges())

  const keyCb = (node) => node.getKey()
  const disjointSet = new DisjoinSet(keyCb)

  graph.getAllNodes().forEach((node) => disjointSet.makeSet(node))

  // Перебираем все ребра с минимального и пытаемся добавить их
  // в минимальное остовное дерево. Критерием добавления ребра является
  // формирование им цикла (если оно соединяет 2 узла одного подмножества)
  sortedEdges.forEach((edge) => {
    // Если ребро не формирует цикл
    if (!disjointSet.isSameSet(edge.from, edge.to)) {
      // Объединяем 2 подмножества в одно
      disjointSet.union(edge.from, edge.to)

      // Добавляем ребро в дерево
      minimumSpanningTree.addEdge(edge)
    }
  })

  return minimumSpanningTree
}
