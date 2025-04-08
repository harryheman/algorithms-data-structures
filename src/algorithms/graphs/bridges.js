import depthFirstSearch from './depth-first-search'

// Метаданные узла
class VisitMetadata {
  constructor({ discoveryTime, lowDiscoveryTime }) {
    // Время исследования
    this.discoveryTime = discoveryTime
    // Наименьшее время исследования
    this.lowDiscoveryTime = lowDiscoveryTime
  }
}

// Функция принимает граф
export default function graphBridges(graph) {
  // Посещенные узлы
  const visited = {}
  // Мосты
  const bridges = {}

  // Время, необходимое для исследования текущего узла
  // (измеряется в количестве посещений узлов)
  let discoveryTime = 0

  const startNode = graph.getAllNodes()[0]

  // Обработчики для DFS
  const callbacks = {
    // Обработчик вхождения в узел
    enterNode: ({ currentNode }) => {
      // Увеличиваем время исследования
      discoveryTime += 1

      // Помещаем текущий узел в посещенные
      visited[currentNode.getKey()] = new VisitMetadata({
        discoveryTime,
        lowDiscoveryTime: discoveryTime,
      })
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

      // Сравниваем минимальное время исследования.
      // Если текущее время меньше, чем время предыдущего узла,
      // обновляем `lowDiscoveryTime` предыдущего узла
      const currentLDT = visited[currentNode.getKey()].lowDiscoveryTime
      const previousLDT = visited[previousNode.getKey()].lowDiscoveryTime
      if (currentLDT < previousLDT) {
        visited[previousNode.getKey()].lowDiscoveryTime = currentLDT
      }

      // Сравниваем текущее минимальное время исследования со временем предка.
      // Проверяем наличие короткого пути.
      // Если мы не можем добраться до текущего узла иначе, чем через предка,
      // значит, ребро между текущим узлом и его предком является мостом
      const parentLDT = visited[previousNode.getKey()].discoveryTime
      if (parentLDT < currentLDT) {
        const bridge = graph.findEdge(previousNode, currentNode)
        bridges[bridge.getKey()] = bridge
      }
    },
    // Обработчик определения допустимости обхода следующего узла
    allowTraverse: ({ nextNode }) => {
      // Запрещаем обход посещенных узлов
      return !visited[nextNode.getKey()]
    },
  }

  // Запускаем поиск в глубину
  depthFirstSearch(graph, startNode, callbacks)

  return bridges
}
