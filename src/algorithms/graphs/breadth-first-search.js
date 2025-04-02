import Queue from '../../data-structures/queue'

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

// Функция принимает граф, начальный узел и обработчики
export default function breadthFirstSearch(graph, startNode, callbacks) {
  // Инициализируем обработчики
  const _callbacks = initCallbacks(callbacks)
  // Создаем очередь
  const queue = new Queue()

  // Добавляем начальный узел в конец очереди
  queue.enqueue(startNode)

  let previousNode = null

  // Пока очередь не является пустой
  while (!queue.isEmpty()) {
    // Извлекаем узел из начала очереди
    const currentNode = queue.dequeue()

    // Вызываем обработчик вхождения в узел
    _callbacks.enterNode({ currentNode, previousNode })

    // Перебираем соседей текущего узла
    graph.getNeighbors(currentNode).forEach((nextNode) => {
      // Если посещение следующего узла разрешено
      if (_callbacks.allowTraverse({ previousNode, currentNode, nextNode })) {
        // Помещаем его в очередь
        queue.enqueue(nextNode)
      }
    })

    // Вызываем обработчик выхода из узла
    _callbacks.leaveNode({ currentNode, previousNode })

    // Запоминаем текущий узел перед следующей итерацией
    previousNode = currentNode
  }
}
