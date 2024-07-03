export default function withoutRepetitions(set) {
  if (set.length === 1) {
    return [set]
  }

  const result = []

  const subset = withoutRepetitions(set.slice(1))
  const first = set[0]

  for (let i = 0; i < subset.length; i++) {
    const smaller = subset[i]
    for (let j = 0; j < smaller.length + 1; j++) {
      const permutation = [...smaller.slice(0, j), first, ...smaller.slice(j)]
      result.push(permutation)
    }
  }

  return result
}
