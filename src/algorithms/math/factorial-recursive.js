// https://ru.wikipedia.org/wiki/%D0%A4%D0%B0%D0%BA%D1%82%D0%BE%D1%80%D0%B8%D0%B0%D0%BB
export default function factorialRecursive(n) {
  return n > 1 ? n * factorialRecursive(n - 1) : 1
}
