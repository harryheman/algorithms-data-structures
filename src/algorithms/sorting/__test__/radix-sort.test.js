import RadixSort from '../radix-sort'
import { SortTester } from '../sort-tester'

// Константы сложности
const ARRAY_OF_STRINGS_VISIT_COUNT = 24
const ARRAY_OF_INTEGERS_VISIT_COUNT = 77

describe('RadixSort', () => {
  it('должен сортировать массивы', () => {
    SortTester.testSort(RadixSort)
  })

  it('должен посетить массив строк n (количество строк) x m (длина самой длинной строки) раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      RadixSort,
      ['zzz', 'bb', 'a', 'rr', 'rrb', 'rrba'],
      ARRAY_OF_STRINGS_VISIT_COUNT,
    )
  })

  it('должен посетить массив целых чисел n (количество чисел) x m (длина самого длинного числа) раз', () => {
    SortTester.testAlgorithmTimeComplexity(
      RadixSort,
      [3, 1, 75, 32, 884, 523, 4343456, 232, 123, 656, 343],
      ARRAY_OF_INTEGERS_VISIT_COUNT,
    )
  })
})
