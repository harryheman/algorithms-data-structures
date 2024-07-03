import countSetBits from './count-set-bits'

/**
 * Вычисляет количество бит, которые нужно изменить для
 * преобразования числа `а` в число `b`
 */
export default function bitsDiff(a, b) {
  return countSetBits(a ^ b)
}
