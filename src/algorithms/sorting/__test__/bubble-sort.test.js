import BubbleSort from '../bubble-sort'
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from '../sort-tester'

// Константы сложности
const SORTED_ARRAY_VISITING_COUNT = 20
const NOT_SORTED_ARRAY_VISITING_COUNT = 189
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 209
const EQUAL_ARRAY_VISITING_COUNT = 20

describe('BubbleSort', () => {
  it('должен сортировать массив', () => {
    SortTester.testSort(BubbleSort)
  })

  it('должен сортировать массив с кастомной функцией сравнения', () => {
    SortTester.testSortWithCustomComparator(BubbleSort)
  })

  it('должен выполнять стабильную сортировку', () => {
    SortTester.testSortStability(BubbleSort)
  })

  it('должен сортировать отрицательные числа', () => {
    SortTester.testNegativeNumbersSort(BubbleSort)
  })

  it('должен посетить массив одинаковых элементов указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      BubbleSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      BubbleSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить неотсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      BubbleSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить инвертированный отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      BubbleSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    )
  })
})
