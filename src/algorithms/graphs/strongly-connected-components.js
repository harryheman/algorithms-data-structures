import Stack from '../../data-structures/stack'
import depthFirstSearch from './depth-first-search'

function getNodesSortedByDfsFinishTime(graph) {
  const visited = {}

  // Стек узлов по времени завершения.
  // Все узлы в этом стеке упорядочены по времени завершения в порядке убывания.
  // Узел, который был завершен первым, будет находиться внизу стека, а
  // узел, который был завершен последним, будет находиться наверху стека
  const stack = new Stack()

  const unvisited = graph.getAllNodes().reduce((a, c) => {
    a[c.getKey()] = c
    return a
  }, {})

  const callbacks = {
    enterNode: ({ currentNode }) => {
      visited[currentNode.getKey()] = currentNode

      delete unvisited[currentNode.getKey()]
    },

    leaveNode: ({ currentNode }) => {
      stack.push(currentNode)
    },

    allowTraverse: ({ nextNode }) => {
      return !visited[nextNode.getKey()]
    },
  }

  while (Object.keys(unvisited).length) {
    const startKey = Object.keys(unvisited)[0]
    const startNode = unvisited[startKey]
    delete unvisited[startKey]

    depthFirstSearch(graph, startNode, callbacks)
  }

  return stack
}

function getSCCSets(graph, stack) {
  const sets = []

  let set = []

  const visited = {}

  const callbacks = {
    enterNode: ({ currentNode }) => {
      set.push(currentNode)

      visited[currentNode.getKey()] = currentNode
    },

    leaveNode: ({ previousNode }) => {
      if (!previousNode) {
        sets.push(set.slice())
      }
    },

    allowTraverse: ({ nextNode }) => {
      return !visited[nextNode.getKey()]
    },
  }

  while (!stack.isEmpty()) {
    const node = stack.pop()

    set = []

    if (!visited[node.getKey()]) {
      depthFirstSearch(graph, node, callbacks)
    }
  }

  return sets
}

export default function stronglyConnectedComponents(graph) {
  const stack = getNodesSortedByDfsFinishTime(graph)
  graph.reverse()
  return getSCCSets(graph, stack)
}
