import PriorityQueue from '../../data-structures/priority-queue'

// Функция принимает граф и начальную вершину
export default function dijkstra(graph, startNode) {
  // Расстояния
  const distances = {}
  // Посещенные вершины
  const visited = {}
  // Предыдущие вершины
  const previous = {}

  const queue = new PriorityQueue()

  // Инициализируем все расстояния бесконечностью, предполагая, что
  // сейчас мы можем достичь только начальную вершину
  for (const node of graph.getAllNodes()) {
    distances[node.getKey()] = Infinity
    previous[node.getKey()] = null
  }

  // Мы находимся в начальной вершине, расстояние до нее равняется 0
  distances[startNode.getKey()] = 0

  // Добавляем текущую вершину в очередь
  queue.add(startNode, 0)

  // Перебираем вершины, пока очередь не опустеет
  while (!queue.isEmpty()) {
    // Извлекаем ближайшую вершину
    const current = queue.poll()

    // Перебираем непосещенных соседей текущей вершины
    current.getNeighbors().forEach((neighbor) => {
      // Если вершина еще не была посещена
      if (!visited[neighbor.getKey()]) {
        // Обновляем расстояние до каждого соседа
        const edge = graph.findEdge(current, neighbor)

        const existingDistanceToNeighbor = distances[neighbor.getKey()]
        const distanceFromNeighborToCurrent =
          distances[current.getKey()] + edge.weight

        // Если обнаружено более короткое расстояние
        if (distanceFromNeighborToCurrent < existingDistanceToNeighbor) {
          distances[neighbor.getKey()] = distanceFromNeighborToCurrent

          // Обновляем приоритет соседа в очереди, поскольку он может стать ближе
          if (queue.hasValue(neighbor)) {
            queue.changePriority(neighbor, distanceFromNeighborToCurrent)
          }

          // Обновляем предыдущую вершину
          previous[neighbor.getKey()] = current
        }

        // Добавляем соседа в очередь для дальнейшего посещения
        if (!queue.hasValue(neighbor)) {
          queue.add(neighbor, distances[neighbor.getKey()])
        }
      }
    })

    // Добавляем текущую вершину в посещенные во избежание повторного посещения
    visited[current.getKey()] = current
  }

  // Возвращаем набор кратчайших расстояний и
  // набор кратчайших путей ко всем вершинам графа
  return { distances, previous }
}
