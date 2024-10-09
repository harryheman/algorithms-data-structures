import QuickSort from '../quick-sort'
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from '../sort-tester'

// Константы временной сложности
const SORTED_ARRAY_VISITING_COUNT = 190
const NOT_SORTED_ARRAY_VISITING_COUNT = 62
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 190
const EQUAL_ARRAY_VISITING_COUNT = 19

describe('QuickSort', () => {
  it('должен отсортировать массив', () => {
    SortTester.testSort(QuickSort)
  })

  it('должен отсортировать массив с помощью кастомной функции сравнения', () => {
    SortTester.testSortWithCustomComparator(QuickSort)
  })

  it('должен выполнить стабильную сортировку', () => {
    SortTester.testSortStability(QuickSort)
  })

  it('должен отсортировать отрицательные числа', () => {
    SortTester.testNegativeNumbersSort(QuickSort)
  })

  it('должен посетить массив одинаковых элементов указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      QuickSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      QuickSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить неотсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      QuickSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить инвертированный отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      QuickSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    )
  })
})
