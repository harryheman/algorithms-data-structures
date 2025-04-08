import Stack from '../../data-structures/stack'
import depthFirstSearch from './depth-first-search'

// Функция принимает граф
export default function topologicalSort(graph) {
  // Узлы, которые мы хотим посетить
  const unvisited = graph.getAllNodes().reduce((a, c) => {
    a[c.getKey()] = c
    return a
  }, {})

  // Посещенные узлы
  const visited = {}

  // Стек отсортированных узлов
  const stack = new Stack()

  // Обработчики для DFS
  const callbacks = {
    // Обработчик вхождения в узел
    enterNode: ({ currentNode }) => {
      // Добавляем узел в посещенные, если все его потомки были исследованы
      visited[currentNode.getKey()] = currentNode

      // Удаляем узел из непосещенных
      delete unvisited[currentNode.getKey()]
    },
    // Обработчик выхода из узла
    leaveNode: ({ currentNode }) => {
      // Помещаем полностью исследованный узел в стек
      stack.push(currentNode)
    },
    // Обработчик определения допустимости обхода следующего узла
    allowTraverse: ({ nextNode }) => {
      // Запрещаем обход посещенных узлов
      return !visited[nextNode.getKey()]
    },
  }

  // Перебираем непосещенные узлы
  while (Object.keys(unvisited).length) {
    const currentKey = Object.keys(unvisited)[0]
    const currentNode = unvisited[currentKey]

    depthFirstSearch(graph, currentNode, callbacks)
  }

  // Преобразуем стек в массив и возвращаем его
  return stack.toArray()
}
