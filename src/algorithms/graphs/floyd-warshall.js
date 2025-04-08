// Функция принимает граф
export default function floydWarshall(graph) {
  // Извлекаем все вершины
  const vertices = graph.getAllNodes()

  // Инициализируем матрицу предыдущих вершин
  const nextVertices = Array(vertices.length)
    .fill(null)
    .map(() => {
      return Array(vertices.length).fill(null)
    })

  // Инициализируем матрицу расстояний
  const distances = Array(vertices.length)
    .fill(null)
    .map(() => {
      return Array(vertices.length).fill(Infinity)
    })

  // Инициализируем `distances` расстояниями,
  // которые нам уже известны (из имеющихся ребер).
  // Также инициализируем матрицу предыдущих вершин
  vertices.forEach((startNode, startIndex) => {
    vertices.forEach((endNode, endIndex) => {
      if (startNode === endNode) {
        // Расстояние вершины до самой себя составляет 0
        distances[startIndex][endIndex] = 0
      } else {
        // Находим ребро между начальной и конечной вершинами
        const edge = graph.findEdge(startNode, endNode)

        // Если такое ребро имеется
        if (edge) {
          // Сохраняем расстояние и предыдущую вершину
          distances[startIndex][endIndex] = edge.weight
          nextVertices[startIndex][endIndex] = startNode
        } else {
          distances[startIndex][endIndex] = Infinity
        }
      }
    })
  })

  // Переходим к основной части алгоритма.
  // Объединяем все вершины в пары (от начала до конца) и проверяем,
  // существует ли между ними более короткий путь через среднюю вершину.
  // Средняя вершина также может быть одной из вершин графа.
  // Таким образом, нам требуется три цикла по всем вершинам графа:
  // для начальной, конечной и средней вершин
  vertices.forEach((middleNode, middleIndex) => {
    // Путь начинается от `startNode` с `startIndex`
    vertices.forEach((_startNode, startIndex) => {
      // Путь заканчивается `endNode` с `endIndex`
      vertices.forEach((_endNode, endIndex) => {
        // Сравниваем существующее расстояние от `startNode` до `endNode`,
        // с расстоянием от `startNode` до `endNode`, но через `middleNode`.
        // Сохраняем кратчайшее расстояние и предыдущую вершину,
        // предоставляющую этот кратчайший путь
        const distViaMiddle =
          distances[startIndex][middleIndex] + distances[middleIndex][endIndex]

        if (distances[startIndex][endIndex] > distViaMiddle) {
          // Мы нашли более короткий путь через `middleNode`
          distances[startIndex][endIndex] = distViaMiddle
          nextVertices[startIndex][endIndex] = middleNode
        }
      })
    })
  })

  // Кратчайшее расстояние от `x` до `y`: `distance[x][y]`.
  // Следующая вершина после `x` на пути от `x` до `y`: `nextVertices[x][y]`
  return { distances, nextVertices }
}
