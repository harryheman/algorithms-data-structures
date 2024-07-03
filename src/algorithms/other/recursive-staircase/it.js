export default function itRecursiveStaircase(n) {
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
      const steps = [1, 2]

      for (let i = 3; i <= n; i++) {
        ;[steps[0], steps[1]] = [steps[1], steps[0] + steps[1]]
      }

      return steps[1]
  }
}
