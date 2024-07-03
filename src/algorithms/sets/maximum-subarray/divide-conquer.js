export default function divideConquer(arr) {
  const dc = (idx, pick) => {
    if (idx >= arr.length) {
      return pick ? 0 : -Infinity
    }

    return Math.max(
      // Вариант 1: берем текущий элемент и переходим к следующему
      arr[idx] + dc(idx + 1, true),
      // Вариант 2: не берем текущий элемент
      pick ? 0 : dc(idx + 1, false),
    )
  }

  return dc(0, false)
}
