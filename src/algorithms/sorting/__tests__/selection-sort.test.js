import SelectionSort from '../selection-sort'
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from '../sort-tester'

// Константы временной сложности
const SORTED_ARRAY_VISITING_COUNT = 209
const NOT_SORTED_ARRAY_VISITING_COUNT = 209
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 209
const EQUAL_ARRAY_VISITING_COUNT = 209

describe('SelectionSort', () => {
  it('должен отсортировать массив', () => {
    SortTester.testSort(SelectionSort)
  })

  it('должен отсортировать массив с помощью кастомной функции сравнения', () => {
    SortTester.testSortWithCustomComparator(SelectionSort)
  })

  it('должен отсортировать отрицательные числа', () => {
    SortTester.testNegativeNumbersSort(SelectionSort)
  })

  it('должен посетить элементы массива одинаковых элементов указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      SelectionSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить элементы отсортированного массива указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      SelectionSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить элементы неотсортированного массива указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      SelectionSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить элементы инвертированного отсортированного массива указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      SelectionSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    )
  })
})
