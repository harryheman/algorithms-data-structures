import depthFirstSearch from '../depth-first-search'

// Функция принимает граф
export default function detectUndirectedCycle(graph) {
  let cycle = null

  // Список посещенных узлов
  const visited = {}

  // Список предков каждого посещенного узла
  const parents = {}

  // Обработчики для DFS
  const callbacks = {
    // Обработчик вхождения в узел
    enterNode: ({ currentNode, previousNode }) => {
      // Если узел уже посещен, то обнаружен цикл
      if (visited[currentNode.getKey()]) {
        // Вычисляем его путь
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
        // Добавляем текущий узел в посещенные
        visited[currentNode.getKey()] = currentNode
        // Обновляем список предков
        parents[currentNode.getKey()] = previousNode
      }
    },
    // Обработчик определения допустимости обхода
    allowTraverse: ({ currentNode, nextNode }) => {
      // Запрещаем обход цикла
      if (cycle) {
        return false
      }

      // Запрещаем возвращаться к предку
      const currentNodeParent = parents[currentNode.getKey()]

      return currentNodeParent?.getKey() !== nextNode.getKey()
    },
  }

  // Берем первый узел
  const startNode = graph.getAllNodes()[0]
  // Запускаем поиск в глубину
  depthFirstSearch(graph, startNode, callbacks)

  return cycle
}
