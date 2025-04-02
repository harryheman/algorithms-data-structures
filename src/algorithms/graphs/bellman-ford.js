// Функция принимает граф и начальную вершину
export default function bellmanFord(graph, startNode) {
  // Расстояния
  const distances = {}
  // Предыдущие вершины
  const previous = {}

  // Расстояние до начальной вершины равняется 0
  distances[startNode.getKey()] = 0
  // Все остальные расстояния равняются бесконечности
  graph.getAllNodes().forEach((node) => {
    if (node.getKey() !== startNode.getKey()) {
      distances[node.getKey()] = Infinity
    }
    previous[node.getKey()] = null
  })

  // Нам требуется `V - 1` итераций, где `V` - множество вершин
  for (let i = 0; i < graph.getAllNodes().length - 1; i++) {
    // Перебираем все вершины на каждой итерации
    Object.keys(distances).forEach((key) => {
      const node = graph.getNodeByKey(key)

      // Перебираем все ребра
      graph.getNeighbors(node).forEach((neighbor) => {
        const edge = graph.findEdge(node, neighbor)
        // Проверяем, является ли расстояние до соседа
        // на этой итерации меньше, чем на предыдущей
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
