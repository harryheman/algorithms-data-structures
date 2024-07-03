import Sort from './sort'

export default class BubbleSort extends Sort {
  sort(arr) {
    // Индикатор изменения позиций элементов массива
    let swapped = false
    // Копируем оригинальный массив во избежание его модификации
    const _arr = arr.slice()

    for (let i = 1; i < _arr.length; i++) {
      swapped = false

      this.callbacks.visitingCallback(_arr[i])

      for (let j = 0; j < _arr.length - i; j++) {
        this.callbacks.visitingCallback(_arr[j])

        // Меняем элементы местами, если они расположены в неправильном порядке
        if (this.comparator.lessThan(_arr[j + 1], _arr[j])) {
          ;[_arr[j], _arr[j + 1]] = [_arr[j + 1], _arr[j]]

          swapped = true
        }
      }

      // Это означает, что массив уже отсортирован
      if (!swapped) {
        return _arr
      }
    }

    return _arr
  }
}
