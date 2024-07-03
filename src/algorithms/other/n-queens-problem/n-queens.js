import QueenPosition from './queen-position'

function isSafe(positions, rowIndex, columnIndex) {
  // Новая позиция, в которую будет помещена королева
  const newPosition = new QueenPosition(rowIndex, columnIndex)

  // Проверяем, не конфликтует ли новая позиция с другими позициями
  for (let i = 0; i < positions.length; i++) {
    const position = positions[i]

    if (
      // Позиция уже установлена
      position &&
      // Есть королева на той же колонке
      (newPosition.columnIndex === position.columnIndex ||
        // Есть королева на той же строке
        newPosition.rowIndex === position.rowIndex ||
        // Есть королева на той же диагонали
        newPosition.leftDiagonal === position.leftDiagonal ||
        newPosition.rightDiagonal === position.rightDiagonal)
    ) {
      // Есть конфликт
      return false
    }
  }

  return true
}

function nQueensRecursive(solutions, previousPositions, count, rowIndex) {
  const positions = previousPositions.slice().map((p) => {
    return !p ? p : new QueenPosition(p.rowIndex, p.columnIndex)
  })

  if (rowIndex === count) {
    // Мы успешно достигли конца доски.
    // Записываем решение в список
    solutions.push(positions)
    return true
  }

  // Пробуем поместить королеву на безопасную позицию
  for (let columnIndex = 0; columnIndex < count; columnIndex++) {
    if (isSafe(positions, rowIndex, columnIndex)) {
      // Помещаем королеву на позицию
      positions[rowIndex] = new QueenPosition(rowIndex, columnIndex)

      // Пробуем поместить следующую королеву
      nQueensRecursive(solutions, positions, count, rowIndex + 1)

      // Очищаем позицию во избежание возврата `false` функцией `isSafe`
      positions[rowIndex] = null
    }
  }

  return false
}

export default function nQueens(count) {
  // Массив координат королев в форме `[rowIndex, columnIndex]`
  const positions = new Array(count).fill(null)

  const solutions = []

  nQueensRecursive(solutions, positions, count, 0)

  return solutions
}
