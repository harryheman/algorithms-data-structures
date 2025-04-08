import depthFirstSearch from './depth-first-search'

// Метаданные узла
class VisitMetadata {
  constructor({ discoveryTime, lowDiscoveryTime }) {
    // Время исследования
    this.discoveryTime = discoveryTime
    // Наименьшее время исследования
    this.lowDiscoveryTime = lowDiscoveryTime
    // Счетчик независимых потомков
    this.independentChildrenCount = 0
  }
}

// Функция принимает граф
export default function articulationPoints(graph) {
  // Посещенные вершины
  const visited = {}

  // Точки сочленения
  const articulationPoints = {}

  // Время, необходимое для исследования текущего узла
  // (измеряется в количестве посещений узлов)
  let discoveryTime = 0

  const startNode = graph.getAllNodes()[0]

  // Обработчики для DFS
  const callbacks = {
    // Обработчик вхождения в узел
    enterNode: ({ currentNode, previousNode }) => {
      // Увеличиваем время исследования
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
    // Обработчик выхода из узла
    leaveNode: ({ currentNode, previousNode }) => {
      if (!previousNode) return

      // Обновляем `lowDiscoveryTime` наименьшим временем соседних узлов
      visited[currentNode.getKey()].lowDiscoveryTime = currentNode
        .getNeighbors()
        .filter((n) => n.getKey() !== previousNode.getKey())
        .reduce((minTime, n) => {
          const lowTime = visited[n.getKey()].lowDiscoveryTime
          return lowTime < minTime ? lowTime : minTime
        }, visited[currentNode.getKey()].lowDiscoveryTime)

      // Определяем, является ли предыдущий узел точкой сочленения.
      // Для этого нужно проверить два условия ИЛИ:
      // 1. Это корневой узел с (минимум) двумя независимыми потомками.
      // 2. Его время исследования <= наименьшее время соседа
      if (previousNode === startNode) {
        // Проверяем, что корневой узел имеет как минимум двух независимых потомков
        if (visited[previousNode.getKey()].independentChildrenCount > 1) {
          articulationPoints[previousNode.getKey()] = previousNode
        }
      } else {
        const currentLDT = visited[currentNode.getKey()].lowDiscoveryTime
        const parentDT = visited[previousNode.getKey()].discoveryTime
        // Проверяем, что время исследования узла <= наименьшее время соседа
        if (parentDT <= currentLDT) {
          articulationPoints[previousNode.getKey()] = previousNode
        }
      }
    },
    // Обработчик определения допустимости исследования узла
    allowTraverse: ({ nextNode }) => {
      // Запрещаем исследование посещенных узлов
      return !visited[nextNode.getKey()]
    },
  }

  // Запускаем поиск в глубину
  depthFirstSearch(graph, startNode, callbacks)

  return articulationPoints
}
