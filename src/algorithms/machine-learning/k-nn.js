import euclideanDistance from '../math/euclidean-distance'

export default function kNN(data, labels, target, k = 3) {
  if (!data || !labels || !target) {
    throw new Error('Отсутствует обязательный параметр!')
  }

  // Вычисляем расстояние от target до каждой точки data.
  // Сохраняем расстояние и метку точки в списке.
  const distances = []

  for (let i = 0; i < data.length; i++) {
    distances.push({
      distance: euclideanDistance([data[i]], [target]),
      label: labels[i],
    })
  }

  // Сортируем список расстояний (от ближайшего к дальнему).
  // Берем k значений.
  const kn = distances
    .sort((a, b) => {
      if (a.distance === b.distance) {
        return 0
      }
      return a.distance < b.distance ? -1 : 1
    })
    .slice(0, k)

  // Считаем количество экземпляров каждого класса.
  const _labels = {}
  let topClass = 0
  let topClassCount = 0

  for (let i = 0; i < kn.length; i++) {
    if (kn[i].label in _labels) {
      _labels[kn[i].label] += 1
    } else {
      _labels[kn[i].label] = 1
    }

    if (_labels[kn[i].label] > topClassCount) {
      topClassCount = _labels[kn[i].label]
      topClass = kn[i].label
    }
  }

  // Возвращает класс с наибольшим количеством экземпляров.
  return topClass
}
