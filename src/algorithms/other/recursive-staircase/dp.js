export default function dpRecursiveStaircase(n) {
  if (n < 0) {
    throw new Error('n меньше нуля!')
  }

  const steps = new Array(n + 1).fill(0)
  steps[0] = 0
  steps[1] = 1
  steps[2] = 2

  for (let i = 3; i <= n; i++) {
    steps[i] = steps[i - 1] + steps[i - 2]
  }

  return steps[n]
}
