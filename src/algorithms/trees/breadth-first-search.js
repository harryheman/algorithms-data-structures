import Queue from '../../data-structures/queue'

// Функция инициализации обработчиков
function initCallbacks(callbacks = {}) {
  const initiatedCallbacks = {}
  const stubCallback = () => {}
  const defaultAllowTraverseCallback = () => true

  // Обработчик определения допустимости обхода
  initiatedCallbacks.allowTraverse =
    callbacks.allowTraverse || defaultAllowTraverseCallback
  // Обработчик вхождения в узел
  initiatedCallbacks.enterNode = callbacks.enterNode || stubCallback
  // Обработчик выхода из узла
  initiatedCallbacks.leaveNode = callbacks.leaveNode || stubCallback

  return initiatedCallbacks
}

// Функция принимает начальный (корневой) узел и обработчики
export default function breadthFirstSearch(root, callbacks) {
  // Инициализируем обработчики
  const _callbacks = initCallbacks(callbacks)
  // Создаем очередь
  const queue = new Queue()

  // Добавляем корневой узел в конец очереди
  queue.enqueue(root)

  // Пока в очереди есть элементы
  while (!queue.isEmpty()) {
    // Берем узел из начала очереди
    const node = queue.dequeue()

    // Вызываем обработчик вхождения в узел
    _callbacks.enterNode(node)

    // Если имеется левый узел и его обход разрешен
    if (node.left && _callbacks.allowTraverse(node, node.left)) {
      // Добавляем его в конец очереди
      queue.enqueue(node.left)
    }

    // Если имеется правый узел и его обход разрешен
    if (node.right && _callbacks.allowTraverse(node, node.right)) {
      // Добавляем его в конец очереди
      queue.enqueue(node.right)
    }

    // Вызываем обработчик выхода в узел
    _callbacks.leaveNode(node)
  }
}
