import * as matrix from '../math/matrix'
import euclideanDistance from '../math/euclidean-distance'

export default function kMeans(data, k = 1) {
  if (!data) {
    throw new Error('Отсутствуют данные для классификации!')
  }

  // Делаем локации k кластеров равными локациям начальных точек k
  const dimension = data[0].length
  const centroids = data.slice(0, k)

  // Матрица расстояний от каждой точки данных до каждого центроида кластера
  const distances = matrix.zeros([data.length, k])

  // Классы векторных точек данных. -1 означает, что класс еще не назначен
  const classes = new Array(data.length).fill(-1)

  let iterate = true
  while (iterate) {
    iterate = false

    // Вычисляем и сохраняем расстояние каждой точки от каждого кластера
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < k; j++) {
        distances[i][j] = euclideanDistance([centroids[j]], [data[i]])
      }

      // Присваиваем ближайший номер кластера каждой точке
      const closestClusterIndex = distances[i].indexOf(
        Math.min(...distances[i]),
      )

      // Проверяем, был ли класс точки изменен и нужно ли повторить итерацию
      if (classes[i] !== closestClusterIndex) {
        iterate = true
      }

      classes[i] = closestClusterIndex
    }

    // Пересчитываем значения центроида кластера через все размеры точек под ним
    for (let i = 0; i < k; i++) {
      // Сбрасываем координаты центра кластера, поскольку нам нужно их пересчитать
      centroids[i] = new Array(dimension).fill(0)
      let clusterSize = 0
      for (let j = 0; j < data.length; j++) {
        if (classes[j] === i) {
          // Регистрируем еще одну точку кластера
          clusterSize += 1
          for (let l = 0; l < dimension; l++) {
            centroids[i][l] += data[j][l]
          }
        }
      }

      // Вычисляем среднее значение для каждой координаты центра кластера
      for (let j = 0; j < dimension; j++) {
        centroids[i][j] = parseFloat(
          Number(centroids[i][j] / clusterSize).toFixed(2),
        )
      }
    }
  }

  return classes
}
