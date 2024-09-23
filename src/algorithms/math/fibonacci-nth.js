import fibonacci from './fibonacci'

/**
 * Вычисляет n-ое число Фибоначчи
 */
export default function fibonacciNth(n) {
  return fibonacci(n)[n - 1]
}
