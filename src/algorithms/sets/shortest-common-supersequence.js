import lcsFn from './longest-common-subsequence/matrix'

export default function scs(set1, set2) {
  // Находим НОП двух множеств
  const lcs = lcsFn(set1, set2)

  // Если НОП пустая, то КОС будет просто
  // объединением множеств
  if (lcs.length === 1 && lcs[0] === '') {
    return set1.concat(set2)
  }

  // Добавляем элементы множеств в порядке перед/внутрь/после НОП
  let result = []

  let idx1 = 0
  let idx2 = 0
  let idx = 0
  let onHold1 = false
  let onHold2 = false

  while (idx < lcs.length) {
    // Добавляем элементы `set1` в правильном порядке
    if (idx1 < set1.length) {
      if (!onHold1 && set1[idx1] !== lcs[idx]) {
        result.push(set1[idx1])
        idx1++
      } else {
        onHold1 = true
      }
    }

    // Добавляем элементы `set2` в правильном порядке
    if (idx2 < set2.length) {
      if (!onHold2 && set2[idx2] !== lcs[idx]) {
        result.push(set2[idx2])
        idx2++
      } else {
        onHold2 = true
      }
    }

    // Добавляем НОП в правильном порядке
    if (onHold1 && onHold2) {
      result.push(lcs[idx])
      idx++
      idx1++
      idx2++
      onHold1 = false
      onHold2 = false
    }
  }

  // Добавляем остатки `set1`
  if (idx1 < set1.length) {
    result = result.concat(set1.slice(idx1))
  }

  // Добавляем остатки `set2`
  if (idx2 < set2.length) {
    result = result.concat(set2.slice(idx2))
  }

  return result
}
