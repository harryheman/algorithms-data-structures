export function primeFactors(n) {
  let _n = n
  const factors = []

  for (let i = 2; i <= Math.sqrt(_n); i++) {
    while (_n % i === 0) {
      _n /= i
      factors.push(i)
    }
  }

  if (_n > 1) {
    factors.push(_n)
  }

  return factors
}

/**
 * Теорема Харди-Рамануджана
 * https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D0%BE%D1%80%D0%B5%D0%BC%D0%B0_%D0%A5%D0%B0%D1%80%D0%B4%D0%B8_%E2%80%94_%D0%A0%D0%B0%D0%BC%D0%B0%D0%BD%D1%83%D0%B4%D0%B6%D0%B0%D0%BD%D0%B0
 */
export function hardyRamanujan(n) {
  return Math.log(Math.log(n))
}
