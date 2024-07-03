import Sort from './sort'

export default class ShellSort extends Sort {
  sort(arr) {
    const _arr = arr.slice()

    // Определяем шаг
    let step = Math.floor(_arr.length / 2)

    // Пока шаг больше нуля, сравниваем и меняем местами элементы
    while (step > 0) {
      // Сравниваем все пары элементов
      for (let i = 0; i < _arr.length - step; i++) {
        let currentIndex = i
        let gapShiftedIndex = i + step

        while (currentIndex >= 0) {
          this.callbacks.visitingCallback(_arr[currentIndex])

          // Сравниваем и меняем элементы местами при необходимости
          if (
            this.comparator.lessThan(_arr[gapShiftedIndex], _arr[currentIndex])
          ) {
            const tmp = _arr[currentIndex]

            _arr[currentIndex] = _arr[gapShiftedIndex]

            _arr[gapShiftedIndex] = tmp
          }

          gapShiftedIndex = currentIndex
          currentIndex -= step
        }
      }
      // Уменьшаем шаг
      step = Math.floor(step / 2)
    }

    return _arr
  }
}
