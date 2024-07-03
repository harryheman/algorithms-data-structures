import DisjoinSet from '../../../data-structures/disjoint-set'

export default function detectUndirectedCycleUsingDisjointSet(graph) {
  // Создаем начальные непересекающиеся одноэлементные множества для каждого узла графа
  const keyExtractor = (node) => node.getKey()
  const disjointSet = new DisjoinSet(keyExtractor)
  graph.getAllNodes().forEach((node) => disjointSet.makeSet(node))

  // Перебираем все ребра графа и проверяем, что узлы ребра принадлежат
  // разным множествам. В этом случае объединяем множества. Делаем это
  // до обнаружения узлов, которые принадлежат обоим множествам. Это
  // означает обнаружение цикла
  let cycle = false
  graph.getAllEdges().forEach((edge) => {
    if (disjointSet.isSameSet(edge.from, edge.to)) {
      cycle = true
    } else {
      disjointSet.union(edge.from, edge.to)
    }
  })

  return cycle
}
