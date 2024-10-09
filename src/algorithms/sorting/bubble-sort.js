import Sort from './sort'

export default class BubbleSort extends Sort {
  sort(arr) {
    // Индикатор перестановки элементов массива
    let swapped = false
    // Копируем оригинальный массив во избежание его модификации
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/structuredClone
    const _arr = structuredClone(arr)

    // Перебираем все элементы массива, начиная со второго
    for (let i = 1; i < _arr.length; i++) {
      swapped = false

      this.callbacks.visitingCallback(_arr[i])

      // Обратите внимание, что здесь мы двигаемся до `i`
      for (let j = 0; j < _arr.length - i; j++) {
        this.callbacks.visitingCallback(_arr[j])

        // Меняем элементы местами, если они расположены в неправильном порядке
        if (this.comparator.lessThan(_arr[j + 1], _arr[j])) {
          ;[_arr[j], _arr[j + 1]] = [_arr[j + 1], _arr[j]]

          // Обновляем индикатор
          swapped = true
        }
      }

      // Это означает, что массив отсортирован
      if (!swapped) {
        return _arr
      }
    }

    return _arr
  }
}
