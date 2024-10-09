import RadixSort from './radix-sort'

const sorter = new RadixSort()

export default function bucketSort(arr, bucketSize = 1) {
  // Создаем блоки
  const buckets = new Array(bucketSize).fill().map(() => [])

  // Находим минимальное значение
  const minValue = Math.min(...arr)
  // Настрой максимальное значение
  const maxValue = Math.max(...arr)

  // Определяем размер блока
  const _bucketSize = Math.ceil(Math.max(1, (maxValue - minValue) / bucketSize))

  // Распределяем элементы исходного массива по группам
  for (const item of arr) {
    const index = Math.floor((item - minValue) / _bucketSize)

    // Крайний случай для максимального значения
    if (index === bucketSize) {
      buckets[bucketSize - 1].push(item)
    } else {
      buckets[index].push(item)
    }
  }

  // Сортируем блоки
  for (let i = 0; i < buckets.length; i += 1) {
    // Используем поразрядную сортировку. Это может дать среднюю
    // временную сложность `O(n + k)` для сортировки одного блока
    // (где `k` - количество цифр самого длинного числа)
    buckets[i] = sorter.sort(buckets[i])
  }

  // Объединяем отсортированные блоки в один массив
  const sortedArr = buckets.flat()

  return sortedArr
}
