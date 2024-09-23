export default function bitwise(set) {
  const subsets = []

  // Количество подмножеств - `2^n`, где `n` - количество элементов в `set`.
  // Это обусловлено тем, что для каждого элемента `set` мы будем решать,
  // включать его в подмножество или нет (2 варианта на каждый элемент)
  const numberOfCombinations = 2 ** set.length

  for (let i = 0; i < numberOfCombinations; i++) {
    const subset = []

    for (let j = 0; j < set.length; j++) {
      // Решаем, включать текущий элемента в подмножество или нет
      if (i & (1 << j)) {
        subset.push(set[j])
      }
    }

    subsets.push(subset)
  }

  return subsets
}
