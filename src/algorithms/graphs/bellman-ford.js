export default function bellmanFord(graph, startNode) {
  const distances = {}
  const previous = {}

  distances[startNode.getKey()] = 0
  graph.getAllNodes().forEach((node) => {
    if (node.getKey() !== startNode.getKey()) {
      distances[node.getKey()] = Infinity
    }
    previous[node.getKey()] = null
  })

  // Нам нужно (|V| - 1) итераций
  for (let i = 0; i < graph.getAllNodes().length - 1; i++) {
    // Перебираем все узлы на каждой итерации
    Object.keys(distances).forEach((key) => {
      const node = graph.getNodeByKey(key)

      // Перебираем все ребра узла
      graph.getNeighbors(node).forEach((neighbor) => {
        const edge = graph.findEdge(node, neighbor)
        // Проверяем, является ли расстояние до соседа короче на этой итерации,
        // чем на предыдущей
        const distanceToNeighbor = distances[node.getKey()] + edge.weight

        if (distanceToNeighbor < distances[neighbor.getKey()]) {
          distances[neighbor.getKey()] = distanceToNeighbor
          previous[neighbor.getKey()] = node
        }
      })
    })
  }

  return {
    distances,
    previous,
  }
}
