import HeapSort from '../heap-sort'
import {
  equalArr,
  notSortedArr,
  reverseArr,
  sortedArr,
  SortTester,
} from '../sort-tester'

// Константы сложности.
// Эти числа не принимают в расчет реструктуризацию кучи,
// поэтому в реальности они будут бОльшими
const SORTED_ARRAY_VISITING_COUNT = 40
const NOT_SORTED_ARRAY_VISITING_COUNT = 40
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 40
const EQUAL_ARRAY_VISITING_COUNT = 40

describe('HeapSort', () => {
  it('должен сортировать массив', () => {
    SortTester.testSort(HeapSort)
  })

  it('должен сортировать массив с кастомной функцией сравнения', () => {
    SortTester.testSortWithCustomComparator(HeapSort)
  })

  it('должен сортировать отрицательные числа', () => {
    SortTester.testNegativeNumbersSort(HeapSort)
  })

  it('должен посетить массив одинаковых элементов указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      HeapSort,
      equalArr,
      EQUAL_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      HeapSort,
      sortedArr,
      SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить неотсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      HeapSort,
      notSortedArr,
      NOT_SORTED_ARRAY_VISITING_COUNT,
    )
  })

  it('должен посетить инвертированный отсортированный массив указанное количество раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      HeapSort,
      reverseArr,
      REVERSE_SORTED_ARRAY_VISITING_COUNT,
    )
  })
})
