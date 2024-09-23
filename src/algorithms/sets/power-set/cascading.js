export default function cascading(set) {
  // Начинаем с пустого множества
  const sets = [[]]

  for (let i = 0; i < set.length; i++) {
    // Без этого мы получим бесконечный цикл,
    // поскольку длина `sets` будет увеличиваться на каждой итерации
    const len = sets.length
    for (let j = 0; j < len; j++) {
      const _set = [...sets[j], set[i]]
      sets.push(_set)
    }
  }

  return sets
}
