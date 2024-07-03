export default function hammingDistance(x, y) {
  if (x.length !== y.length) {
    throw new Error('Строки должны иметь одинаковую длину!')
  }

  let distance = 0

  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) {
      distance++
    }
  }

  return distance
}
