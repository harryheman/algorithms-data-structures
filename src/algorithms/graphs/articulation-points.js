import depthFirstSearch from './depth-first-search'

class VisitMetadata {
  constructor({ discoveryTime, lowDiscoveryTime }) {
    this.discoveryTime = discoveryTime
    this.lowDiscoveryTime = lowDiscoveryTime
    // Это нужно для определения 2 независимых потомков
    this.independentChildrenCount = 0
  }
}

export default function articulationPoints(graph) {
  const visited = {}

  const articulationPoints = {}

  // Время, необходимое для исследования текущего узла
  let discoveryTime = 0

  const startNode = graph.getAllNodes()[0]

  const callbacks = {
    enterNode: ({ currentNode, previousNode }) => {
      discoveryTime += 1

      // Помещаем текущий узел в посещенные
      visited[currentNode.getKey()] = new VisitMetadata({
        discoveryTime,
        lowDiscoveryTime: discoveryTime,
      })

      if (previousNode) {
        // Обновляем счетчик потомков предыдущего узла
        visited[previousNode.getKey()].independentChildrenCount += 1
      }
    },

    leaveNode: ({ currentNode, previousNode }) => {
      if (!previousNode) return

      // Обновляем lowDiscoveryTime наименьшим временем соседних узлов.
      // Получаем минимальное время из всех соседей
      visited[currentNode.getKey()].lowDiscoveryTime = currentNode
        .getNeighbors()
        .filter((n) => n.getKey() !== previousNode.getKey())
        .reduce((minTime, n) => {
          const lowTime = visited[n.getKey()].lowDiscoveryTime
          return lowTime < minTime ? lowTime : minTime
        }, visited[currentNode.getKey()].lowDiscoveryTime)

      // Определяем, является ли предыдущий узел точкой артикуляции.
      // Для этого нужно проверить два условия ИЛИ:
      // 1. Это корневой узел с двумя независимыми потомками (минимум).
      // 2. Его время посещения <= меньшего времени соседа
      if (previousNode === startNode) {
        // Проверяем, что корневой узел имеет как минимум 2 независимых потомков
        if (visited[previousNode.getKey()].independentChildrenCount > 1) {
          articulationPoints[previousNode.getKey()] = previousNode
        }
      } else {
        const currentLDT = visited[currentNode.getKey()].lowDiscoveryTime
        const parentDT = visited[previousNode.getKey()].discoveryTime
        if (parentDT <= currentLDT) {
          articulationPoints[previousNode.getKey()] = previousNode
        }
      }
    },

    allowTraverse: ({ nextNode }) => {
      return !visited[nextNode.getKey()]
    },
  }

  depthFirstSearch(graph, startNode, callbacks)

  return articulationPoints
}
