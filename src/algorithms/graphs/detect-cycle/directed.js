import depthFirstSearch from '../depth-first-search'

export default function detectDirectedCycle(graph) {
  let cycle = null

  // Список предков каждого посещенного узла
  const parents = {}

  // Белый набор содержит узлы, которые еще не посещались
  const whiteSet = {}

  // Серый набор содержит узлы, которые посещаются сейчас (на текущем пути)
  const graySet = {}

  // Черный набор содержит узлы, которые полностью посещены.
  // Это означает, что были посещены все потомки узла
  const blackSet = {}

  // Обнаружение узла в сером наборе означает, что обнаружен цикл.
  // Если узел находится в сером наборе, значит, его соседи или соседи его соседей
  // сейчас посещаются

  // Инициализируем белый набор
  graph.getAllNodes().forEach((node) => {
    whiteSet[node.getKey()] = node
  })

  // Обработчики для DFS
  const callbacks = {
    // Обработчик вхождения в узел
    enterNode: ({ currentNode, previousNode }) => {
      // Если узел находится в сером наборе, значит, обнаружен цикл
      if (graySet[currentNode.getKey()]) {
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
        // Добавляем текущий узел в серый набор и удаляем его из белого набора
        graySet[currentNode.getKey()] = currentNode
        delete whiteSet[currentNode.getKey()]

        // Обновляем список предков
        parents[currentNode.getKey()] = previousNode
      }
    },
    // Обработчик выхода из узла
    leaveNode: ({ currentNode }) => {
      // Если все потомки узла были посещены, удаляем его из серого набора
      // и добавляем в черный набор
      blackSet[currentNode.getKey()] = currentNode
      delete graySet[currentNode.getKey()]
    },
    // Обработчик определения допустимости обхода
    allowTraverse: ({ nextNode }) => {
      // Запрещаем обход цикла
      if (cycle) {
        return false
      }

      // Запрещаем обход черных узлов
      return !blackSet[nextNode.getKey()]
    },
  }

  // Пока в белом наборе есть узлы
  while (Object.keys(whiteSet).length) {
    // Берем первый узел
    const firstKey = Object.keys(whiteSet)[0]
    const startNode = whiteSet[firstKey]
    // Запускаем поиск в глубину
    depthFirstSearch(graph, startNode, callbacks)
  }

  return cycle
}
