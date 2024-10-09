import CountingSort from '../counting-sort'
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from '../sort-tester'

// Константы временной сложности
const SORTED_ARRAY_VISITING_COUNT = 60
const NOT_SORTED_ARRAY_VISITING_COUNT = 60
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 60
const EQUAL_ARRAY_VISITING_COUNT = 60

describe('CountingSort', () => {
  it('должен отсортировать массив', () => {
    SortTester.testSort(CountingSort)
  })

  it('должен отсортировать отрицательные числа', () => {
    SortTester.testNegativeNumbersSort(CountingSort)
  })

  it('должен принимать максимальное/минимальное целые числа для ускорения сортировки', () => {
    const visitingCallback = jest.fn()
    const sorter = new CountingSort({ visitingCallback })

    // Определяем наибольшее число
    const biggestElement = Math.max(...notSortedArr)

    // Определяем наименьшее число
    const smallestElement = Math.min(...notSortedArr)

    const sortedArray = sorter.sort(
      notSortedArr,
      smallestElement,
      biggestElement,
    )

    expect(sortedArray).toEqual(sortedArr)
    // Обычно `visitingCallback()` вызывается 60 раз, но в данном случае
    // он должен быть вызван только 40 раз
    expect(visitingCallback).toHaveBeenCalledTimes(40)
  })

  it('должен посетить массив одинаковых элементов указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      CountingSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      CountingSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить неотсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      CountingSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить инвертированный отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      CountingSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    )
  })
})
