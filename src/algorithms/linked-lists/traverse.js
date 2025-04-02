// Функция принимает связный список и обработчик посещения узла
export default function traverse(list, cb) {
  // Берем головной узел
  let node = list.head

  // Пока есть узлы
  while (node) {
    // Обрабатываем узел
    cb(node.value)
    // Берем следующий
    node = node.next
  }
}
