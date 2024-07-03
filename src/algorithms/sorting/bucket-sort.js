import RadixSort from './radix-sort'

export default function bucketSort(arr, bucketSize = 1) {
  const buckets = new Array(bucketSize).fill().map(() => [])

  const minValue = Math.min(...arr)
  const maxValue = Math.max(...arr)

  const _bucketSize = Math.ceil(Math.max(1, (maxValue - minValue) / bucketSize))

  // Помещаем элементы в группы
  for (const item of arr) {
    const index = Math.floor((item - minValue) / _bucketSize)

    // Крайний случай для максимального значения
    if (index === bucketSize) {
      buckets[bucketSize - 1].push(item)
    } else {
      buckets[index].push(item)
    }
  }

  // Сортируем группы
  for (let i = 0; i < buckets.length; i += 1) {
    // Используем поразрядную сортировку. Это может дать среднюю
    // временную сложность O(n + k) для сортировки одной группы
    // (где k - это число цифр самого длинного числа)
    buckets[i] = new RadixSort().sort(buckets[i])
  }

  console.log(buckets)

  // Объединяем отсортированные группы в один массив
  const sortedArr = buckets.reduce((acc, bucket) => acc.concat(bucket), [])

  return sortedArr
}
