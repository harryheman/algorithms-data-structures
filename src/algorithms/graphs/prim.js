import Graph from '../../data-structures/graph/index'
import PriorityQueue from '../../data-structures/priority-queue'

// Функция принимает граф
export default function prim(graph) {
  // При передаче направленного графа должно выбрасываться исключение
  if (graph.isDirected) {
    throw new Error('Алгоритм Прима работает только с ненаправленными графами')
  }

  // Инициализируем новый граф, который будет содержать
  // минимальное остовное дерево (МОД) исходного графа
  const minimumSpanningTree = new Graph()

  // Эта очередь с приоритетом будет содержать все ребра,
  // начинающиеся от посещенных узлов и ранжированные по весу -
  // на каждом шаге мы всегда будем получать ребро с минимальным весом
  const edgesQueue = new PriorityQueue()

  // Набор посещенных узлов
  const visited = {}

  // Начальный узел для обхода графа
  const startNode = graph.getAllNodes()[0]

  // Добавляем начальный узел в набор посещенных узлов
  visited[startNode.getKey()] = startNode

  // Добавляем все ребра начального узла в очередь
  startNode.getEdges().forEach((graphEdge) => {
    edgesQueue.add(graphEdge, graphEdge.weight)
  })

  // Перебираем ребра, находящиеся в очереди
  while (!edgesQueue.isEmpty()) {
    // Извлекаем следующее ребро с минимальным весом
    const currentMinEdge = edgesQueue.poll()

    // Находим следующий непосещенный минимальный узел для обхода
    let nextMinNode = null
    if (!visited[currentMinEdge.from.getKey()]) {
      nextMinNode = currentMinEdge.from
    } else if (!visited[currentMinEdge.to.getKey()]) {
      nextMinNode = currentMinEdge.to
    }

    // Пропускаем итерацию, если все узлы текущего ребра уже посещены
    if (nextMinNode) {
      // Добавляем текущее минимальное ребро в МОД
      minimumSpanningTree.addEdge(currentMinEdge)

      // Добавляем узел в посещенные
      visited[nextMinNode.getKey()] = nextMinNode

      // Добавляем ребра узла в очередь
      nextMinNode.getEdges().forEach((graphEdge) => {
        // Добавляем только те ребра, которые ведут к непосещенным узлам
        if (
          !visited[graphEdge.from.getKey()] ||
          !visited[graphEdge.to.getKey()]
        ) {
          edgesQueue.add(graphEdge, graphEdge.weight)
        }
      })
    }
  }

  return minimumSpanningTree
}
