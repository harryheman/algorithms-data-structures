/**
 * Возвращает количество битов, используемых для бинарного представления числа
 */
export default function bitLength(n) {
  let count = 0
  while (1 << count <= n) {
    count++
  }
  return count
}
