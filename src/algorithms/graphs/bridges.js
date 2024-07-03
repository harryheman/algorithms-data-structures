import depthFirstSearch from './depth-first-search'

class VisitMetadata {
  constructor({ discoveryTime, lowDiscoveryTime }) {
    this.discoveryTime = discoveryTime
    this.lowDiscoveryTime = lowDiscoveryTime
  }
}

export default function graphBridges(graph) {
  const visited = {}
  const bridges = {}

  let discoveryTime = 0

  const startNode = graph.getAllNodes()[0]

  const callbacks = {
    enterNode: ({ currentNode, previousNode }) => {
      discoveryTime += 1

      visited[currentNode.getKey()] = new VisitMetadata({
        discoveryTime,
        lowDiscoveryTime: discoveryTime,
      })
    },
    leaveNode: ({ currentNode, previousNode }) => {
      if (!previousNode) return

      visited[currentNode.getKey()].lowDiscoveryTime = currentNode
        .getNeighbors()
        .filter((n) => n.getKey() !== previousNode.getKey())
        .reduce((minTime, n) => {
          const lowTime = visited[n.getKey()].lowDiscoveryTime
          return lowTime < minTime ? lowTime : minTime
        }, visited[currentNode.getKey()].lowDiscoveryTime)

      // Сравниваем минимальное время исследования. Если текущее МВИ меньше, чем
      // МВИ предыдущего узла, обновляем МВИ предыдущего узла
      const currentLDT = visited[currentNode.getKey()].lowDiscoveryTime
      const previousLDT = visited[previousNode.getKey()].lowDiscoveryTime
      if (currentLDT < previousLDT) {
        visited[previousNode.getKey()].lowDiscoveryTime = currentLDT
      }

      // Сравниваем ткущее МВИ с МВИ предка. Проверяем наличие
      // короткого пути. Если мы не можем добраться до текущего узла иначе,
      // чем через предка, значит, предок является точкой артикуляции для текущего узла
      const parentLDT = visited[previousNode.getKey()].discoveryTime
      if (parentLDT < currentLDT) {
        const bridge = graph.findEdge(previousNode, currentNode)
        bridges[bridge.getKey()] = bridge
      }
    },
    allowTraverse: ({ nextNode }) => {
      return !visited[nextNode.getKey()]
    },
  }

  depthFirstSearch(graph, startNode, callbacks)

  return bridges
}
