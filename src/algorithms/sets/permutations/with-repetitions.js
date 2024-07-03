export default function withRepetitions(set, length = set.length) {
  if (length === 1) {
    return set.map((i) => [i])
  }

  const result = []

  const subset = withRepetitions(set, length - 1)

  for (const i of set) {
    for (const j of subset) {
      result.push([i, ...j])
    }
  }

  return result
}
