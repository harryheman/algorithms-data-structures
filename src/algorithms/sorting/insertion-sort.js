import Sort from './sort'

export default class InsertionSort extends Sort {
  sort(arr) {
    const _arr = arr.slice()

    for (let i = 1; i < _arr.length; i++) {
      this.callbacks.visitingCallback(_arr[i])

      let currentIndex = i

      while (
        _arr[currentIndex - 1] !== undefined &&
        this.comparator.lessThan(_arr[currentIndex], _arr[currentIndex - 1])
      ) {
        this.callbacks.visitingCallback(_arr[currentIndex - 1])
        // Меняем элементы местами
        ;[_arr[currentIndex - 1], _arr[currentIndex]] = [
          _arr[currentIndex],
          _arr[currentIndex - 1],
        ]

        // Двигаемся влево
        currentIndex--
      }
    }

    return _arr
  }
}
