export default function withoutRepetitions(set, length) {
  if (length === 1) {
    return set.map((i) => [i])
  }

  const result = []

  set.forEach((i, idx) => {
    const subset = withoutRepetitions(set.slice(idx + 1), length - 1)

    for (const j of subset) {
      result.push([i, ...j])
    }
  })

  return result
}
