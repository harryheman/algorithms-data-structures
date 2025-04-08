// Функция принимает начальный узел, все пути
// на данной итерации и текущий путь.
// Возвращает все возможные пути
function findAllPaths(startNode, paths = [], path = []) {
  // Текущий путь
  const currentPath = [...path, startNode]

  // Посещенные узлы
  const visitedNodes = currentPath.reduce((a, n) => {
    const copy = { ...a }
    copy[n.getKey()] = n
    return copy
  }, {})

  // Непосещенные соседи
  const unvisitedNeighbors = startNode
    .getNeighbors()
    .filter((n) => !visitedNodes[n.getKey()])

  // Если непосещенных соседей не осталось,
  // то путь завершен, сохраняем его
  if (!unvisitedNeighbors.length) {
    paths.push(currentPath)
    return paths
  }

  // Перебираем непосещенных соседей
  for (const neighbor of unvisitedNeighbors) {
    // Рекурсивно исследуем их пути
    findAllPaths(neighbor, paths, currentPath)
  }

  return paths
}

// Функция принимает матрицу смежности, индексы узлов и цикл.
// Возвращает вес/стоимость цикла
function getCycleWeight(adjacencyMatrix, nodesIndices, cycle) {
  let weight = 0

  for (let i = 1; i < cycle.length; i++) {
    const fromNode = cycle[i - 1]
    const toNode = cycle[i]
    const fromIndex = nodesIndices[fromNode.getKey()]
    const toIndex = nodesIndices[toNode.getKey()]
    weight += adjacencyMatrix[fromIndex][toIndex]
  }

  return weight
}

// Функция принимает граф
export default function bfTravellingSalesman(graph) {
  const startNode = graph.getAllNodes()[0]

  // Получаем все возможные пути
  const paths = findAllPaths(startNode)

  // Нас интересуют только пути, образующие циклы
  const cycles = paths.filter((p) => {
    const lastNode = p.at(-1)
    const lastNodeNeighbors = lastNode.getNeighbors()

    return lastNodeNeighbors.includes(startNode)
  })

  // Матрица смежности
  const adjacencyMatrix = graph.getAdjacencyMatrix()
  // Индексы узлов
  const nodesIndices = graph.getNodesIndices()
  // Путь коммивояжера
  let salesmanPath = []
  // Минимальный вес пути коммивояжера
  let salesmanPathWeight = null

  // Перебираем циклы
  for (const cycle of cycles) {
    // Вычисляем вес цикла
    const cycleWeight = getCycleWeight(adjacencyMatrix, nodesIndices, cycle)

    // Нас интересует путь с минимальным весом
    if (salesmanPathWeight === null || cycleWeight < salesmanPathWeight) {
      salesmanPath = cycle
      salesmanPathWeight = cycleWeight
    }
  }

  return salesmanPath
}
