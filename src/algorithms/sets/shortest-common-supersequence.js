import lcsFn from './longest-common-subsequence/index'

export default function scs(set1, set2) {
  const lcs = lcsFn(set1, set2)

  if (lcs.length === 1 && lcs[0] === '') {
    return set1.concat(set2)
  }

  let result = []

  let idx1 = 0
  let idx2 = 0
  let idx = 0
  let onHold1 = false
  let onHold2 = false

  while (idx < lcs.length) {
    if (idx1 < set1.length) {
      if (!onHold1 && set1[idx1] !== lcs[idx]) {
        result.push(set1[idx1])
        idx1++
      } else {
        onHold1 = true
      }
    }

    //
    if (idx2 < set2.length) {
      if (!onHold2 && set2[idx2] !== lcs[idx]) {
        result.push(set2[idx2])
        idx2++
      } else {
        onHold2 = true
      }
    }

    //
    if (onHold1 && onHold2) {
      result.push(lcs[idx])
      idx++
      idx1++
      idx2++
      onHold1 = false
      onHold2 = false
    }
  }

  if (idx1 < set1.length) {
    result = result.concat(set1.slice(idx1))
  }

  if (idx2 < set2.length) {
    result = result.concat(set2.slice(idx2))
  }

  return result
}
