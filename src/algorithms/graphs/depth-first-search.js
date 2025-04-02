// Функция инициализации обработчиков
function initCallbacks(callbacks = {}) {
  const initiatedCallbacks = {}
  const stubCallback = () => {}
  // Замыкание
  const defaultAllowTraverseCallback = (() => {
    // Посещенные узлы
    const traversed = {}
    return ({ nextNode }) => {
      // Пропускаем следующий узел, если он уже был посещен
      if (!traversed[nextNode.getKey()]) {
        traversed[nextNode.getKey()] = true
        return true
      }
      return false
    }
  })()
  initiatedCallbacks.allowTraverse =
    callbacks.allowTraverse || defaultAllowTraverseCallback
  initiatedCallbacks.enterNode = callbacks.enterNode || stubCallback
  initiatedCallbacks.leaveNode = callbacks.leaveNode || stubCallback
  return initiatedCallbacks
}

// Функция принимает граф, текущий и предыдущий узлы, а также обработчики
function depthFirstSearchRecursive(
  graph,
  currentNode,
  previousNode,
  callbacks,
) {
  // Вызываем обработчик вхождения в узел
  callbacks.enterNode({ currentNode, previousNode })

  // Перебираем соседей текущего узла
  graph.getNeighbors(currentNode).forEach((nextNode) => {
    // Если узел не был посещен
    if (callbacks.allowTraverse({ previousNode, currentNode, nextNode })) {
      // Обходим его
      depthFirstSearchRecursive(graph, nextNode, currentNode, callbacks)
    }
  })

  // Вызываем обработчик выхода из узла
  callbacks.leaveNode({ currentNode, previousNode })
}

// Функция принимает граф, начальный узел и обработчики
export default function depthFirstSearch(graph, startNode, callbacks) {
  // Инициализируем обработчики
  const _callbacks = initCallbacks(callbacks)
  // Обходим граф
  depthFirstSearchRecursive(graph, startNode, null, _callbacks)
}
