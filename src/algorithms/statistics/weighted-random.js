/**
 * Возвращает произвольный элемент на основе его веса.
 * Элементы с более высоким весом выбираются чаще (с большей вероятностью).
 *
 * Например:
 * - items = ['banana', 'orange', 'apple']
 * - weights = [0, 0.2, 0.8]
 * - weightedRandom(items, weights) в 80% случаев будет возвращать 'apple',
 * в 20% случаев - 'orange' и никогда - 'banana' (поскольку вероятность его выбора равна 0%)
 *
 * @param {any[]} items
 * @param {number[]} weights
 * @returns {{item: any, index: number}}
 */
export default function weightedRandom(items, weights) {
  if (!items.length || !weights.length) {
    throw new Error('Элементы/веса не должны быть пустыми')
  }
  if (items.length !== weights.length) {
    throw new Error('Массивы элементов и весов должны иметь одинаковую длину')
  }

  // Готовим массив совокупных весов.
  // Например:
  // - weights = [1, 4, 3]
  // - cumulativeWeights = [1, 5, 8]
  const cumulativeWeights = []
  for (let i = 0; i < weights.length; i++) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0)
  }

  // Получаем произвольное число в диапазоне [0...sum(weights)].
  // Например:
  // - weights = [1, 4, 3]
  // - maxCumulativeWeight = 8
  // - диапазон произвольного числа - [0...8]
  const maxCumulativeWeight = cumulativeWeights.at(-1)
  const random = Math.random() * maxCumulativeWeight

  // Извлекаем произвольный элемент на основе его веса.
  // Элементы с более высоким весом выбираются чаще
  const index = cumulativeWeights.findIndex((cumulativeWeight) => {
    return cumulativeWeight >= random
  })
  const item = items[index]

  return {
    item,
    index,
  }
}
