import Sort from './sort'

export default class ShellSort extends Sort {
  sort(arr) {
    // Копируем оригинальный массив во избежание его модификации
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/structuredClone
    const _arr = structuredClone(arr)

    // Определяем шаг - половина массива
    let step = Math.floor(_arr.length / 2)

    // До тех пор, пока шаг больше нуля
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

      // Уменьшаем шаг в 2 раза
      step = Math.floor(step / 2)
    }

    return _arr
  }
}
