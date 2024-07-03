import depthFirstSearch from '../depth-first-search'

export default function detectUndirectedCycle(graph) {
  let cycle = null

  // Список посещенных узлов
  const visited = {}

  // Список предков для каждого посещенного узла
  const parents = {}

  // Колбеки для DFS
  const callbacks = {
    enterNode: ({ currentNode, previousNode }) => {
      if (visited[currentNode.getKey()]) {
        cycle = {}

        let current = currentNode
        let previous = previousNode

        while (currentNode.getKey() !== previous.getKey()) {
          cycle[current.getKey()] = previous
          current = previous
          previous = parents[previous.getKey()]
        }

        cycle[current.getKey()] = previous
      } else {
        visited[currentNode.getKey()] = currentNode
        parents[currentNode.getKey()] = previousNode
      }
    },
    allowTraverse: ({ currentNode, nextNode }) => {
      if (cycle) {
        return false
      }

      // Не разрешаем возвращаться к предку
      const currentNodeParent = parents[currentNode.getKey()]

      return currentNodeParent?.getKey() !== nextNode.getKey()
    },
  }

  const startNode = graph.getAllNodes()[0]
  depthFirstSearch(graph, startNode, callbacks)

  return cycle
}
