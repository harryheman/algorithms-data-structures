export default function isPositive(n) {
  if (n === 0) return false

  return ((n >> 31) & 1) === 0
}
