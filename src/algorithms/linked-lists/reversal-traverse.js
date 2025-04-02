// Функция принимает узел и обработчик его посещения
function reversalTraverseRecursive(node, cb) {
  // Пока есть узел
  if (node) {
    // Вызываем функцию со следующим узлом
    reversalTraverseRecursive(node.next, cb)
    // Обрабатываем узел
    cb(node.value)
  }
}

// Функция принимает связный список и обработчик посещения узла
export default function reversalTraverse(list, cb) {
  // Для того, чтобы понять рекурсию, надо сначала понять рекурсию :)
  reversalTraverseRecursive(list.head, cb)
}
