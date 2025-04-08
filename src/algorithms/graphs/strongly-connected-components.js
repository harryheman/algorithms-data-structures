import Stack from '../../data-structures/stack'
import depthFirstSearch from './depth-first-search'

// Функция принимает граф.
// Возвращает стек узлов, упорядоченных по времени исследования
function getNodesSortedByDfsFinishTime(graph) {
  // Список посещенных узлов
  const visited = {}

  // Стек узлов по времени исследования (измеряется в количестве посещений узлов).
  // Все узлы в этом стеке отсортированы по времени исследования в порядке убывания.
  // Узел, который был исследован первым, будет находиться внизу стека, а
  // узел, который был исследован последним, будет находиться наверху стека
  const stack = new Stack()

  // Список непосещенных узлов
  const unvisited = graph.getAllNodes().reduce((a, c) => {
    a[c.getKey()] = c
    return a
  }, {})

  // Обработчики для DFS
  const callbacks = {
    // Обработчик вхождения в узел
    enterNode: ({ currentNode }) => {
      // Добавляем узел в посещенные
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

  // Перебираем непосещенные узлы и обходим их в глубину
  while (Object.keys(unvisited).length) {
    const startKey = Object.keys(unvisited)[0]
    const startNode = unvisited[startKey]
    delete unvisited[startKey]

    depthFirstSearch(graph, startNode, callbacks)
  }

  return stack
}

// Функция принимает граф и стек узлов, упорядоченных по времени исследования.
// Возвращает наборы компонент связности
function getSCCSets(graph, stack) {
  // Наборы компонент связности
  const sets = []
  // Текущий компонент связности
  let set = []
  // Список посещенных узлов
  const visited = {}

  // Обработчики для DFS
  const callbacks = {
    // Обработчик вхождения в узел
    enterNode: ({ currentNode }) => {
      // Добавляем узел в текущий компонент связности
      set.push(currentNode)
      // Добавляем узел в посещенные
      visited[currentNode.getKey()] = currentNode
    },
    // Обработчик выхода из узла
    leaveNode: ({ previousNode }) => {
      // Если узел является корневым, значит, мы нашли новый компонент связности
      if (!previousNode) {
        // Добавляем текущий компонент связности в наборы
        sets.push(set.slice())
      }
    },
    // Обработчик определения допустимости обхода следующего узла
    allowTraverse: ({ nextNode }) => {
      // Запрещаем обход посещенных узлов
      return !visited[nextNode.getKey()]
    },
  }

  // Перебираем стек узлов и обходим их в глубину
  while (!stack.isEmpty()) {
    const node = stack.pop()

    set = []

    if (!visited[node.getKey()]) {
      depthFirstSearch(graph, node, callbacks)
    }
  }

  return sets
}

// Функция принимает граф
export default function stronglyConnectedComponents(graph) {
  // Получаем стек узлов, упорядоченных по времени исследования
  const stack = getNodesSortedByDfsFinishTime(graph)
  // Инвертируем граф
  graph.reverse()
  // Получаем и возвращаем наборы компонент связности
  return getSCCSets(graph, stack)
}
