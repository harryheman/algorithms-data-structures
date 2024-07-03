import Sort from './sort'

export default class MergeSort extends Sort {
  sort(arr) {
    this.callbacks.visitingCallback(null)

    // Если массив пустой или содержит только один элемент,
    // возвращаем его, поскольку он уже отсортирован
    if (arr.length <= 1) {
      return arr
    }

    // Делим массив пополам
    const middleIndex = Math.floor(arr.length / 2)
    const leftArray = arr.slice(0, middleIndex)
    const rightArray = arr.slice(middleIndex, arr.length)

    // Сортируем половины
    const leftSortedArray = this.sort(leftArray)
    const rightSortedArray = this.sort(rightArray)

    // Объединяем отсортированные половины в один массив
    return this.mergeSortedArrays(leftSortedArray, rightSortedArray)
  }

  mergeSortedArrays(leftArray, rightArray) {
    const _arr = []

    // Используем указатели для исключения элементов, добавленных в массив
    let leftIndex = 0
    let rightIndex = 0

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      let minItem = null

      // Находим минимальный между левым и правым массивами элемент
      if (
        this.comparator.lessThanOrEqual(
          leftArray[leftIndex],
          rightArray[rightIndex],
        )
      ) {
        minItem = leftArray[leftIndex]
        // Двигаемся вправо
        leftIndex += 1
      } else {
        minItem = rightArray[rightIndex]
        // Двигаемся влево
        rightIndex += 1
      }

      // Добавляем минимальный элемент в отсортированный массив
      _arr.push(minItem)

      this.callbacks.visitingCallback(minItem)
    }

    // Добавляем оставшиеся элементы в отсортированный массив
    return _arr
      .concat(leftArray.slice(leftIndex))
      .concat(rightArray.slice(rightIndex))
  }
}
