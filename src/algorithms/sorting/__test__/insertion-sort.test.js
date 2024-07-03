import InsertionSort from '../insertion-sort'
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from '../sort-tester'

// Константы сложности
const SORTED_ARRAY_VISITING_COUNT = 19
const NOT_SORTED_ARRAY_VISITING_COUNT = 100
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 209
const EQUAL_ARRAY_VISITING_COUNT = 19

describe('InsertionSort', () => {
  it('должен сортировать массив', () => {
    SortTester.testSort(InsertionSort)
  })

  it('должен сортировать массив с кастомной функцией сравнения', () => {
    SortTester.testSortWithCustomComparator(InsertionSort)
  })

  it('должен выполнять стабильную сортировку', () => {
    SortTester.testSortStability(InsertionSort)
  })

  it('должен сортировать отрицательные числа', () => {
    SortTester.testNegativeNumbersSort(InsertionSort)
  })

  it('должен посетить массив одинаковых элементов указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      InsertionSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      InsertionSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить неотсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      InsertionSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить инвертированный отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      InsertionSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    )
  })
})
