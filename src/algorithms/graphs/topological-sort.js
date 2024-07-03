import Stack from '../../data-structures/stack'
import depthFirstSearch from './depth-first-search'

export default function topologicalSort(graph) {
  // Узлы, которые мы хотим посетить
  const unvisited = graph.getAllNodes().reduce((a, c) => {
    a[c.getKey()] = c
    return a
  }, {})

  // Узлы, которые мы посетили
  const visited = {}

  // Стек отсортированных узлов
  const stack = new Stack()

  // Коллбеки для DFS
  const callbacks = {
    enterNode: ({ currentNode }) => {
      // Добавляем узел в посещенные, если все его потомки были исследованы
      visited[currentNode.getKey()] = currentNode

      // Удаляем узел из непосещенных
      delete unvisited[currentNode.getKey()]
    },
    leaveNode: ({ currentNode }) => {
      // После полностью исследованный узел в стек
      stack.push(currentNode)
    },
    allowTraverse: ({ nextNode }) => {
      return !visited[nextNode.getKey()]
    },
  }

  while (Object.keys(unvisited).length) {
    const currentKey = Object.keys(unvisited)[0]
    const currentNode = unvisited[currentKey]

    depthFirstSearch(graph, currentNode, callbacks)
  }

  return stack.toArray()
}
