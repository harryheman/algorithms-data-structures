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

// Функция принимает узел и обработчики
function depthFirstSearchRecursive(node, callbacks) {
  // Вызываем обработчик вхождения в узел
  callbacks.enterNode(node)

  // Если имеется левый узел и его обход разрешен
  if (node.left && callbacks.allowTraverse(node, node.left)) {
    // Обходим левое поддерево
    depthFirstSearchRecursive(node.left, callbacks)
  }

  // Если имеется правый узел и его обход разрешен
  if (node.right && callbacks.allowTraverse(node, node.right)) {
    // Обходим правое поддерево
    depthFirstSearchRecursive(node.right, callbacks)
  }

  // Вызываем обработчик выхода из узла
  callbacks.leaveNode(node)
}

// Функция принимает начальный (корневой) узел и обработчики
export default function depthFirstSearch(root, callbacks) {
  // Инициализируем обработчики
  const _callbacks = initCallbacks(callbacks)
  // Запускаем рекурсию
  depthFirstSearchRecursive(root, _callbacks)
}
