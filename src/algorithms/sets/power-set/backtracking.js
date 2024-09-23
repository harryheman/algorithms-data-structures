export default function backtracking(
  set,
  allSubsets = [[]],
  currentSubset = [],
  start = 0,
) {
  // Перебираем элементы множества, которые могут быть добавлены в подмножество
  // без дублирования (это обеспечивается значением `start`)
  for (let i = start; i < set.length; i++) {
    // Добавляем текущий элемент в подмножество
    currentSubset.push(set[i])

    // Текущее подмножество является валидным, запоминаем его.
    // `structuredClone()` создает копию `currentSubset`.
    // Это необходимо, поскольку `currentSubset` будет модифицирован
    // в дальнейших рекурсивных вызовах
    allSubsets.push(structuredClone(currentSubset))

    // Генерируем другие подмножества для текущего подмножества.
    // В качестве значения `start` передаем `i + 1` во избежание дублирования
    backtracking(set, allSubsets, currentSubset, i + 1)

    // Удаляем последний элемент и берем следующий
    currentSubset.pop()
  }

  return allSubsets
}
