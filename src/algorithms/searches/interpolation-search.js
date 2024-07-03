export default function interpolationSearch(sortedArr, target) {
  let start = 0
  let end = sortedArr.length - 1

  while (start <= end) {
    const rangeDelta = sortedArr[end] - sortedArr[start]
    const indexDelta = end - start
    const valueDelta = target - sortedArr[start]

    // Если `valueDelta` равняется 0, значит, искомый элемент
    // в массиве отсутствует
    if (valueDelta < 0) return -1

    // Если `rangeDelta` равняется 0, значит, подмассив содержит
    // одинаковые числа, поэтому искать нечего
    if (!rangeDelta) {
      // Это также позволяет избежать деления на 0 при поиске
      // центрального элемента ниже
      return sortedArr[start] === target ? start : -1
    }

    const middleIndex =
      start + Math.floor((valueDelta * indexDelta) / rangeDelta)

    if (sortedArr[middleIndex] === target) {
      return middleIndex
    }

    if (sortedArr[middleIndex] < target) {
      // Переходим к правой половине массива
      start = middleIndex + 1
    } else {
      // переходим к левой половине массива
      end = middleIndex - 1
    }
  }

  return -1
}
