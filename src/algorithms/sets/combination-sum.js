function combinationSumRecursive(
  candidates,
  remainingSum,
  finalCombinations = [],
  currentCombination = [],
  startFrom = 0,
) {
  if (remainingSum < 0) {
    // Добавив кандидата, мы опустились ниже `0`.
    // Это означает, что последний кандидат неприемлем
    return finalCombinations
  }

  if (remainingSum === 0) {
    // Если после добавления кандидата, мы получили `0`,
    // нужно сохранить текущую комбинацию, поскольку
    // это одно из искомых решений
    finalCombinations.push(currentCombination.slice())

    return finalCombinations
  }

  // Если мы пока не получили `0`, продолжаем добавлять оставшихся кандидатов
  for (let i = startFrom; i < candidates.length; i++) {
    const currentCandidate = candidates[i]

    currentCombination.push(currentCandidate)

    combinationSumRecursive(
      candidates,
      remainingSum - currentCandidate,
      finalCombinations,
      currentCombination,
      i,
    )

    // Возвращаемся назад, исключаем текущего кандидата и пробуем другого
    currentCombination.pop()
  }

  return finalCombinations
}

export default function combinationSum(candidates, target) {
  return combinationSumRecursive(candidates, target)
}
