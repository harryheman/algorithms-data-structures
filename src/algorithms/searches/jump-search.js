import Comparator from '../../utils/comparator'

export default function jumpSearch(sortedArr, target, fn) {
  const comparator = new Comparator(fn)
  const length = sortedArr.length
  if (!length) return -1

  // Вычисляем оптимальный шаг.
  // Общее количество сравнений в худшем случае будет ((length/step) + step - 1).
  // Значение функции ((length/step) + step - 1) будет минимальным при step = √length
  let step = Math.floor(Math.sqrt(length))

  let start = 0
  let end = step

  // Ищем блок, к которому принадлежит искомый элемент
  while (comparator.greaterThan(target, sortedArr[Math.min(end, length) - 1])) {
    // Переходим к следующему блоку
    start = end
    end += step

    if (start > length) return -1
  }

  // Выполняем линейный поиск в блоке, к которому принадлежит
  // `target`, начиная со `start`
  let currentIndex = start
  while (currentIndex < Math.min(end, length)) {
    if (comparator.equal(target, sortedArr[currentIndex])) {
      return currentIndex
    }
    currentIndex++
  }

  return -1
}
