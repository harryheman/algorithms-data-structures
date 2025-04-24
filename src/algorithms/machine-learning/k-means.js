// Утилиты для матричных вычислений
import * as matrix from '../math/matrix'
// Функция для вычисления евклидова расстояния
import euclideanDistance from '../math/euclidean-distance'

/** Функция принимает:
 * data - данные
 * k    - количество кластеров
 */
export default function kMeans(data, k = 1) {
  if (!data) {
    throw new Error('Отсутствуют данные для классификации')
  }

  // Количество измерений
  const dimension = data[0].length
  // Центроиды
  const centroids = data.slice(0, k)

  // Матрица расстояний от каждой точки до каждого центроида
  const distances = matrix.zeros([data.length, k])

  // Классы векторных точек данных.
  // - 1 означает, что класс еще не назначен
  const classes = new Array(data.length).fill(-1)

  // Индикатор итерации
  let iterate = true
  while (iterate) {
    iterate = false

    // Вычисляем и сохраняем расстояние каждой точки от каждого центроида
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < k; j++) {
        distances[i][j] = euclideanDistance([centroids[j]], [data[i]])
      }

      // Присваиваем метку ближайшего кластера каждой точке
      const closestClusterIndex = distances[i].indexOf(
        Math.min(...distances[i]),
      )

      // Проверяем, был ли класс точки изменен
      // и нужно ли повторить итерацию
      if (classes[i] !== closestClusterIndex) {
        iterate = true
      }

      classes[i] = closestClusterIndex
    }

    // Пересчитываем положение центроида кластера
    // на основе содержащихся в нем точек
    for (let i = 0; i < k; i++) {
      // Сбрасываем координаты центроида, поскольку нам нужно их пересчитать
      centroids[i] = new Array(dimension).fill(0)
      let clusterSize = 0
      for (let j = 0; j < data.length; j++) {
        if (classes[j] === i) {
          // Регистрируем еще одну точку текущего кластера
          clusterSize += 1
          for (let l = 0; l < dimension; l++) {
            centroids[i][l] += data[j][l]
          }
        }
      }

      // Вычисляем среднее значение каждой координаты центроида
      for (let j = 0; j < dimension; j++) {
        centroids[i][j] = parseFloat(
          Number(centroids[i][j] / clusterSize).toFixed(2),
        )
      }
    }
  }

  return classes
}
