export default function countSetBits(n) {
  let count = 0
  let _n = n

  while (_n) {
    // добавляем последний бит числа к сумме установленных битов
    count += _n & 1
    // сдвигаем число вправо на один бит для исследования других битов
    _n >>>= 1
  }

  return count
}
