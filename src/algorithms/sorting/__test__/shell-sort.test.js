import ShellSort from '../shell-sort'
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from '../sort-tester'

// Константы сложности
const SORTED_ARRAY_VISITING_COUNT = 320
const NOT_SORTED_ARRAY_VISITING_COUNT = 320
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 320
const EQUAL_ARRAY_VISITING_COUNT = 320

describe('ShellSort', () => {
  it('должен сортировать массив', () => {
    SortTester.testSort(ShellSort)
  })

  it('должен сортировать массив с кастомной функцией сравнения', () => {
    SortTester.testSortWithCustomComparator(ShellSort)
  })

  it('должен сортировать отрицательные числа', () => {
    SortTester.testNegativeNumbersSort(ShellSort)
  })

  it('должен посетить массив одинаковых элементов указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      ShellSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      ShellSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить неотсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      ShellSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить инвертированный отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      ShellSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    )
  })
})