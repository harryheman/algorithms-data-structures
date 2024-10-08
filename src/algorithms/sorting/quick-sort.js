import Sort from './sort'

export default class QuickSort extends Sort {
  sort(arr) {
    // Копируем оригинальный массив во избежание его модификации
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/structuredClone
    const _arr = structuredClone(arr)

    // Если массив пустой или содержит только один элемент,
    // возвращаем его, поскольку он уже отсортирован
    if (_arr.length <= 1) {
      return _arr
    }

    const leftArr = []
    const rightArr = []

    // Берем первый элемент массива в качестве опорного
    const pivot = _arr.shift()
    const centerArr = [pivot]

    // Распределяем все элементы массива между левым, центральным и правым подмассивами
    while (_arr.length) {
      const currentItem = _arr.shift()

      this.callbacks.visitingCallback(currentItem)

      if (this.comparator.equal(currentItem, pivot)) {
        centerArr.push(currentItem)
      } else if (this.comparator.lessThan(currentItem, pivot)) {
        leftArr.push(currentItem)
      } else {
        rightArr.push(currentItem)
      }
    }

    // Сортируем левый и правый подмассивы
    const leftArraySorted = this.sort(leftArr)
    const rightArraySorted = this.sort(rightArr)

    // Объединяем массивы слева направо
    return leftArraySorted.concat(centerArr, rightArraySorted)
  }
}
