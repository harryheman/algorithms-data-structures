function findAllPaths(startNode, paths = [], path = []) {
  const currentPath = [...path, startNode]

  const visitedNodes = currentPath.reduce((a, n) => {
    const copy = { ...a }
    copy[n.getKey()] = n
    return copy
  }, {})

  const unvisitedNeighbors = startNode
    .getNeighbors()
    .filter((n) => !visitedNodes[n.getKey()])

  // Если нет непосещенных соседей, то путь завершен, сохраняем его
  if (!unvisitedNeighbors.length) {
    paths.push(currentPath)
    return paths
  }

  for (const neighbor of unvisitedNeighbors) {
    findAllPaths(neighbor, paths, currentPath)
  }

  return paths
}

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

// Brute force

export default function bfTravellingSalesman(graph) {
  const startNode = graph.getAllNodes()[0]

  // Грубая сила
  const paths = findAllPaths(startNode)

  // Нас интересуют только пути, образующие циклы
  const cycles = paths.filter((p) => {
    const lastNode = p.at(-1)
    const lastNodeNeighbors = lastNode.getNeighbors()

    return lastNodeNeighbors.includes(startNode)
  })

  // Перебираем циклы и берем цикл с наименьшим весом
  const adjacencyMatrix = graph.getAdjacencyMatrix()
  const nodesIndices = graph.getNodesIndices()
  let salesmanPath = []
  let salesmanPathWeight = null

  for (const cycle of cycles) {
    const cycleWeight = getCycleWeight(adjacencyMatrix, nodesIndices, cycle)

    if (salesmanPathWeight === null || cycleWeight < salesmanPathWeight) {
      salesmanPath = cycle
      salesmanPathWeight = cycleWeight
    }
  }

  return salesmanPath
}
