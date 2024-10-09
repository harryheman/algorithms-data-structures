import Sort from './sort'

// `charCode` (кодовая единица UTF-16) (a = 97, b = 98 и т.д.) позволяет
// привязывать символы к группам от 0 до 25 (в английском алфавите 26 букв)
const BASE_CHAR_CODE = 97
// 0-9
const NUMBER_OF_POSSIBLE_DIGITS = 10
// a-z
const ENGLISH_ALPHABET_LENGTH = 26

export default class RadixSort extends Sort {
  sort(arr) {
    // Все элементы массива должны иметь одинаковый тип
    const isArrayOfNumbers = this.isArrayOfNumbers(arr)

    // Копируем оригинальный массив во избежание его модификации
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/structuredClone
    let sortedArr = structuredClone(arr)
    // Определяем нужное количество итераций
    const numPasses = this.determineNumPasses(sortedArr)

    // Формируем сегменты
    for (let i = 0; i < numPasses; i++) {
      const buckets = isArrayOfNumbers
        ? this.placeItemsInNumBucket(sortedArr, i)
        : this.placeItemsInCharBucket(sortedArr, i, numPasses)

      // Распаковываем сегменты
      sortedArr = buckets.flat()
    }

    return sortedArr
  }

  placeItemsInNumBucket(arr, index) {
    // Это используется ниже для определения группы,
    // к которой принадлежит число
    const modded = 10 ** (index + 1)
    const divided = 10 ** index
    const buckets = this.createBuckets(NUMBER_OF_POSSIBLE_DIGITS)

    arr.forEach((item) => {
      this.callbacks.visitingCallback(item)

      if (item < divided) {
        buckets[0].push(item)
      } else {
        // Допустим, у нас есть элемент `1052` и текущий индекс `1` (начиная с `0`). Это означает,
        // что мы хотим использовать `5` как группу. `modded` будет равняться `10 ** (1 + 1)`
        // или `100`. Поэтому мы берем `1052 % 100 (52)`, делим на `10 (5.2)` и округляем до `5`
        const currentDigit = Math.floor((item % modded) / divided)
        buckets[currentDigit].push(item)
      }
    })

    return buckets
  }

  placeItemsInCharBucket(arr, index, numPasses) {
    const buckets = this.createBuckets(ENGLISH_ALPHABET_LENGTH)

    arr.forEach((item) => {
      this.callbacks.visitingCallback(item)
      const currentBucket = this.getCharCodeOfItemAtIndex(
        item,
        index,
        numPasses,
      )
      buckets[currentBucket].push(item)
    })

    return buckets
  }

  getCharCodeOfItemAtIndex(item, index, numPasses) {
    // Помещаем элемент в последнюю группу,
    // если он не готов к упорядочиванию
    if (numPasses - index > item.length) {
      return ENGLISH_ALPHABET_LENGTH - 1
    }

    // Если каждый символ упорядочен, используем первый символ для определения группы,
    // иначе, перебираем символы в обратном порядке
    const charPos = index > item.length - 1 ? 0 : item.length - index - 1

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
    return item.toLowerCase().charCodeAt(charPos) - BASE_CHAR_CODE
  }

  // Количество итераций определяется длиной самого длинного элемента массива.
  // Для целых чисел - это `log10(num)`, для строк - длина строки
  determineNumPasses(arr) {
    if (this.isArrayOfNumbers(arr)) {
      return Math.floor(Math.log10(Math.max(...arr))) + 1
      // return Math.max(...arr.map((i) => i.toString().length))
    }

    return Math.max(...arr.map((i) => i.length))
  }

  isArrayOfNumbers(arr) {
    return Number.isInteger(arr[0])
  }

  createBuckets(size) {
    return new Array(size).fill().map(() => [])
  }
}
