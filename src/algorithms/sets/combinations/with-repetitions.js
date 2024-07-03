export default function withRepetitions(set, length) {
  if (length === 1) {
    return set.map((i) => [i])
  }

  const result = []

  set.forEach((i, idx) => {
    const subset = withRepetitions(set.slice(idx), length - 1)

    for (const j of subset) {
      result.push([i, ...j])
    }
  })

  return result
}
