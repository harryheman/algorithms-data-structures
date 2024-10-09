import Sort from './sort'

export default class InsertionSort extends Sort {
  sort(arr) {
    // Копируем оригинальный массив во избежание его модификации
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/structuredClone
    const _arr = structuredClone(arr)

    // Перебираем все элементы массива, начиная со второго
    for (let i = 1; i < _arr.length; i++) {
      this.callbacks.visitingCallback(_arr[i])

      let currentIndex = i

      // Цикл выполняется до тех пор,
      // пока у нас имеется предыдущий элемент и
      // текущий элемент меньше предыдущего
      // (левый элемент больше правого)
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
