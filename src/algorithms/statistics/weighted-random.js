export default function weightedRandom(items, weights) {
  if (!items.length || !weights.length) {
    throw new Error('Элементы/веса не должны быть пустыми!')
  }
  if (items.length !== weights.length) {
    throw new Error('Элементы и веса должны быть одинаковой длины!')
  }

  const cumulativeWeights = []

  for (let i = 0; i < weights.length; i++) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0)
  }

  const random = Math.random() * cumulativeWeights.at(-1)
  const index = cumulativeWeights.findIndex((cumulativeWeight) => {
    return cumulativeWeight >= random
  })
  const item = items[index]

  return {
    item,
    index,
  }
}
