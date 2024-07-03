import Sort from './sort'

export default class SelectionSort extends Sort {
  sort(arr) {
    const _arr = arr.slice()

    for (let i = 0; i < _arr.length - 1; i++) {
      let minIndex = i

      this.callbacks.visitingCallback(_arr[i])

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
