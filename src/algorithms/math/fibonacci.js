// https://ru.wikipedia.org/wiki/%D0%A7%D0%B8%D1%81%D0%BB%D0%B0_%D0%A4%D0%B8%D0%B1%D0%BE%D0%BD%D0%B0%D1%87%D1%87%D0%B8
export default function fibonacci(n) {
  const arr = [1]
  if (n === 1) {
    return arr
  }

  let current = 1
  let previous = 0

  let i = n - 1
  while (i) {
    current += previous
    previous = current - previous
    arr.push(current)
    i--
  }

  return arr
}
