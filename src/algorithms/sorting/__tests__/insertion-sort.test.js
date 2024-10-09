import InsertionSort from '../insertion-sort'
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from '../sort-tester'

// Константы временной сложности
const SORTED_ARRAY_VISITING_COUNT = 19
const NOT_SORTED_ARRAY_VISITING_COUNT = 100
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 209
const EQUAL_ARRAY_VISITING_COUNT = 19

describe('InsertionSort', () => {
  it('должен отсортировать массив', () => {
    SortTester.testSort(InsertionSort)
  })

  it('должен отсортировать массив с помощью кастомной функции сравнения', () => {
    SortTester.testSortWithCustomComparator(InsertionSort)
  })

  it('должен выполнить стабильную сортировку', () => {
    SortTester.testSortStability(InsertionSort)
  })

  it('должен отсортировать отрицательные числа', () => {
    SortTester.testNegativeNumbersSort(InsertionSort)
  })

  it('должен посетить элементы массива одинаковых элементов указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      InsertionSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить элементы отсортированного массива указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      InsertionSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить элементы неотсортированного массива указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      InsertionSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить элементы инвертированного отсортированного массива указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      InsertionSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    )
  })
})
