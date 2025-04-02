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
  vertices.forEach((startVertex, startIndex) => {
    vertices.forEach((endVertex, endIndex) => {
      if (startVertex === endVertex) {
        // Расстояние вершины до самой себя составляет 0
        distances[startIndex][endIndex] = 0
      } else {
        // Находим ребро между начальной и конечной вершинами
        const edge = graph.findEdge(startVertex, endVertex)

        // Если такое ребро имеется
        if (edge) {
          // Сохраняем расстояние и предыдущую вершину
          distances[startIndex][endIndex] = edge.weight
          nextVertices[startIndex][endIndex] = startVertex
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
  vertices.forEach((middleVertex, middleIndex) => {
    // Путь начинается от `startVertex` с `startIndex`
    vertices.forEach((_startVertex, startIndex) => {
      // Путь заканчивается `endVertex` с `endIndex`
      vertices.forEach((_endVertex, endIndex) => {
        // Сравниваем существующее расстояние от `startVertex` до `endVertex`,
        // с расстоянием от `startVertex` до `endVertex`, но через `middleVertex`.
        // Сохраняем кратчайшее расстояние и предыдущую вершину,
        // предоставляющую этот кратчайший путь
        const distViaMiddle =
          distances[startIndex][middleIndex] + distances[middleIndex][endIndex]

        if (distances[startIndex][endIndex] > distViaMiddle) {
          // Мы нашли более короткий путь через `middleVertex`
          distances[startIndex][endIndex] = distViaMiddle
          nextVertices[startIndex][endIndex] = middleVertex
        }
      })
    })
  })

  // Кратчайшее расстояние от `x` до `y`: `distance[x][y]`.
  // Следующая вершина после `x` на пути от `x` до `y`: `nextVertices[x][y]`
  return { distances, nextVertices }
}
