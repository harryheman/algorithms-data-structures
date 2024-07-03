import fibonacci from './fibonacci'

/**
 * Вычисляет указанное число Фибоначчи
 */
export default function fibonacciNth(n) {
  return fibonacci(n)[n - 1]
}
