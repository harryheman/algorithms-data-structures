import Sort from './sort'

export default class SelectionSort extends Sort {
  sort(arr) {
    // Копируем оригинальный массив во избежание его модификации
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/structuredClone
    const _arr = structuredClone(arr)

    // Перебираем все элементы массива
    for (let i = 0; i < _arr.length - 1; i++) {
      // Индекс минимального элемента
      let minIndex = i

      this.callbacks.visitingCallback(_arr[i])

      // Обратите внимание, что здесь мы двигаемся от `i + 1`
      for (let j = i + 1; j < _arr.length; j++) {
        this.callbacks.visitingCallback(_arr[j])

        if (this.comparator.lessThan(_arr[j], _arr[minIndex])) {
          minIndex = j
        }
      }

      // Если обнаружен новый минимальный элемент,
      // меняем на него текущий элемент
      if (minIndex !== i) {
        ;[_arr[i], _arr[minIndex]] = [_arr[minIndex], _arr[i]]
      }
    }

    return _arr
  }
}
