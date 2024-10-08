export default function isPowerOfTwoBitwise(n) {
  // 1 (2^0) - это наименьший результат возведения числа 2 в какую-либо степень
  if (n < 1) return false

  /**
   * Степени 2 в бинарном формате имеют следующий вид:
   * 1: 0001
   * 2: 0010
   * 4: 0100
   * 8: 1000
   *
   * Почти всегда установлен 1 бит. Исключением являются целые числа со знаком.
   * Например, -128 выглядит как 10_000_000, но мы уже проверили, что число больше 0
   */
  return (n & (n - 1)) === 0
}
