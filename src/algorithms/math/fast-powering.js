export default function fastPowering(base, power) {
  if (power === 0) return 1

  if (power % 2 === 0) {
    // Если степень четная:
    // x^8 = x^4 * x^4
    return fastPowering(base, power / 2) ** 2
  }

  // Если степень нечетная:
  // x^9 = x^4 * x^4 * x
  return base * fastPowering(base, Math.floor(power / 2)) ** 2
}
