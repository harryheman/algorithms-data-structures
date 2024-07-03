import Comparator from '../../utils/comparator'

export default function binarySearch(sortedArr, target, comparatorFn) {
  const comparator = new Comparator(comparatorFn)

  let start = 0
  let end = sortedArr.length - 1

  while (start <= end) {
    // Вычисляем индекс центрального элемента
    let middle = start + Math.floor((end - start) / 2)

    if (comparator.equal(sortedArr[middle], target)) {
      return middle
    }

    if (comparator.lessThan(sortedArr[middle], target)) {
      // Переходим к правой половине массива
      start = middle + 1
    } else {
      // ПереNavig к левой половине массива
      end = middle - 1
    }
  }

  return -1
}
