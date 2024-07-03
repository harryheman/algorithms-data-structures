import depthFirstSearch from '../depth-first-search'

export default function detectDirectedCycle(graph) {
  let cycle = null

  // Хранилище предков (предыдущих узлов) всех посещенных узлов.
  // Это потребуется в дальнейшем для определения пути, который является циклом
  const parents = {}

  // Белый набор (НЕПОСЕЩЕННЫЕ) содержит все узлы, которые не посещались
  const whiteSet = {}

  // Серый набор (ПОСЕЩАЕМЫЕ) содержит все узлы, которые посещаются сейчас (на текущем пути)
  const graySet = {}

  // Черный набор (ПОСЕЩЕННЫЕ) содержит все узлы, которые полностью посещены.
  // Это означает, что были посещены все потомки узла
  const blackSet = {}

  // Обнаружение узла в сером наборе означает, что мы нашли цикл.
  // Если узел находится в сером наборе, значит, его соседи или соседи его соседей
  // сейчас исследуются

  // Инициализируем белый набор
  graph.getAllNodes().forEach((node) => {
    whiteSet[node.getKey()] = node
  })

  // Определяем колбеки DFS
  const callbacks = {
    enterNode: ({ currentNode, previousNode }) => {
      if (graySet[currentNode.getKey()]) {
        // Если узел находится в сером наборе, значит, обнаружен цикл.
        // Вычисляем его путь=
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
        // Добавляем текущий узел в серый набор и удаляем его из белого набора
        graySet[currentNode.getKey()] = currentNode
        delete whiteSet[currentNode.getKey()]

        // Обновляем список предков
        parents[currentNode.getKey()] = previousNode
      }
    },

    leaveNode: ({ currentNode }) => {
      // Если все потомки узла были посещены, удаляем его из серого набора
      // и добавляем в черный набор
      blackSet[currentNode.getKey()] = currentNode
      delete graySet[currentNode.getKey()]
    },

    allowTraverse: ({ nextNode }) => {
      // Если был обнаружен цикл, нужно прекратить обход во
      // избежание бесконечного цикла
      if (cycle) {
        return false
      }

      // Разрешаем обход узлов, отсутствующих в черном наборе
      return !blackSet[nextNode.getKey()]
    },
  }

  while (Object.keys(whiteSet).length) {
    const firstKey = Object.keys(whiteSet)[0]
    const startNode = whiteSet[firstKey]

    depthFirstSearch(graph, startNode, callbacks)
  }

  return cycle
}
