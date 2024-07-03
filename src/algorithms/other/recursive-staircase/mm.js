export default function mmRecursiveStaircase(stairs) {
  if (stairs < 0) {
    throw new Error('n меньше нуля!')
  }

  const memo = []

  const getSteps = (n) => {
    switch (n) {
      case 0:
        return 0
      case 1:
        return 1
      case 2:
        return 2
      case memo[n]:
        return memo[n]
      default:
        memo[n] = getSteps(n - 1) + getSteps(n - 2)
        return memo[n]
    }
  }

  return getSteps(stairs)
}
