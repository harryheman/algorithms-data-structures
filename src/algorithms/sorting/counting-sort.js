import Sort from './sort'

export default class CountingSort extends Sort {
  sort(arr, smallestItem, biggestItem) {
    // Инициализируем наименьшее и наибольшее числа для построения массива сегментов позже
    let _smallestItem = smallestItem || 0
    let _biggestItem = biggestItem || 0

    if (!smallestItem || !biggestItem) {
      arr.forEach((item) => {
        this.callbacks.visitingCallback(item)

        // Определяем наибольший элемент
        if (this.comparator.greaterThan(item, _biggestItem)) {
          _biggestItem = item
        }

        // Определяем наименьший элемент
        if (this.comparator.lessThan(item, _smallestItem)) {
          _smallestItem = item
        }
      })
    }

    // Инициализируем массив сегментов,
    // который будет содержать частоту элементов `arr`
    const buckets = new Array(_biggestItem - _smallestItem + 1).fill(0)

    arr.forEach((item) => {
      this.callbacks.visitingCallback(item)

      buckets[item - _smallestItem]++
    })

    // Добавляем предыдущие частоты к текущей для каждого числа в сегменте,
    // чтобы определить, сколько чисел меньше текущего должно стоять
    // слева от него
    for (let i = 1; i < buckets.length; i++) {
      buckets[i] += buckets[i - 1]
    }

    // Теперь сдвинем частоты вправо, чтобы они показывали правильные числа.
    // Если мы этого не сделаем, то `buckets[5]`, например, покажет, сколько
    // элементов, меньших 5, нужно поместить слева от 5 в отсортированном массиве,
    // ВКЛЮЧАЯ 5. После сдвига 5 будет исключено
    buckets.pop()
    buckets.unshift(0)

    // Формируем отсортированный массив
    const sortedArr = new Array(arr.length).fill(null)

    arr.forEach((item) => {
      this.callbacks.visitingCallback(item)

      // Получаем позицию элемента в отсортированном массиве
      const sortedPosition = buckets[item - _smallestItem]
      // Добавляем элемент на правильную позицию в отсортированном массиве
      sortedArr[sortedPosition] = item
      // Увеличиваем позицию текущего элемента в сегменте для будущих правильных размещений
      buckets[item - _smallestItem]++
    })

    return sortedArr
  }
}
