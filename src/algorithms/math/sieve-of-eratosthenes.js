// https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D1%88%D0%B5%D1%82%D0%BE_%D0%AD%D1%80%D0%B0%D1%82%D0%BE%D1%81%D1%84%D0%B5%D0%BD%D0%B0
export default function sieveOfEratosthenes(n) {
  const sieve = new Array(n + 1).fill(true)
  sieve[0] = false
  sieve[1] = false

  const primes = []

  for (let i = 2; i <= n; i++) {
    if (sieve[i]) {
      primes.push(i)

      /**
       * Оптимизация.
       * Начинаем отмечать множители `p` с `p * p`, а не с `p * 2`.
       * Это работает, поскольку меньшие множители `p` уже помечены как `false`.
       */
      let nextN = i * i

      while (nextN <= n) {
        sieve[nextN] = false
        nextN += i
      }
    }
  }

  return primes
}
