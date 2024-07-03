import MergeSort from '../merge-sort'
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from '../sort-tester'

// Константы сложности
const SORTED_ARRAY_VISITING_COUNT = 79
const NOT_SORTED_ARRAY_VISITING_COUNT = 102
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 87
const EQUAL_ARRAY_VISITING_COUNT = 79

describe('MergeSort', () => {
  it('должен сортировать массив', () => {
    SortTester.testSort(MergeSort)
  })

  it('должен сортировать массив с кастомной функцией сравнения', () => {
    SortTester.testSortWithCustomComparator(MergeSort)
  })

  it('должен выполнять стабильную сортировку', () => {
    SortTester.testSortStability(MergeSort)
  })

  it('должен сортировать отрицательные числа', () => {
    SortTester.testNegativeNumbersSort(MergeSort)
  })

  it('должен посетить массив одинаковых элементов указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      MergeSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      MergeSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить неотсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      MergeSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить инвертированный отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      MergeSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    )
  })
})
