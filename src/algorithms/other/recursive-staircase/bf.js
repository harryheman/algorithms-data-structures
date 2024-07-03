export default function bfRecursiveStaircase(n) {
  if (n < 0) {
    throw new Error('n меньше нуля!')
  }
  switch (n) {
    case 0:
      return 0
    case 1:
      return 1
    case 2:
      return 2
    default:
      return bfRecursiveStaircase(n - 1) + bfRecursiveStaircase(n - 2)
  }
}
