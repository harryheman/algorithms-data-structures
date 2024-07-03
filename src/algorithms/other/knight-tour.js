function getMoves(board, position) {
  // Генерируем все возможные ходы рыцаря (включая те, которые находятся за пределами доски)
  const moves = [
    [position[0] - 1, position[1] - 2],
    [position[0] - 2, position[1] - 1],
    [position[0] + 1, position[1] - 2],
    [position[0] + 2, position[1] - 1],
    [position[0] - 2, position[1] + 1],
    [position[0] - 1, position[1] + 2],
    [position[0] + 1, position[1] + 2],
    [position[0] + 2, position[1] + 1],
  ]

  // Отфильтруем ходы, которые выходят за пределы доски
  const boardSize = board.length
  return moves.filter(
    (move) =>
      move[0] >= 0 &&
      move[0] < boardSize &&
      move[1] >= 0 &&
      move[1] < boardSize,
  )
}

function isMoveAllowed(board, move) {
  return board[move[0]][move[1]] !== 1
}

function isBoardVisited(board, moves) {
  const possibleCount = board.length ** 2
  const realCount = moves.length

  return possibleCount === realCount
}

function knightTourRecursive(board, moves) {
  // Если доска полностью посещена, значит, решение найдено
  if (isBoardVisited(board, moves)) {
    return true
  }

  // Получаем следующие возможные ходы
  const possibleMoves = getMoves(board, moves.at(-1))

  for (const move of possibleMoves) {
    if (isMoveAllowed(board, move)) {
      // Выполняем ход
      moves.push(move)
      board[move[0]][move[1]] = 1

      // Если дальнейшие ходы, начиная с текущего являются успешными, значит, решение найдено
      if (knightTourRecursive(board, moves)) {
        return true
      }

      // Если текущий ход был неудачным, возвращаемся назад и пробуем сделать другой ход
      moves.pop()
      board[move[0]][move[1]] = 0
    }
  }

  return false
}

export default function knightTour(size) {
  const board = new Array(size).fill().map(() => new Array(size).fill(0))
  const moves = [[0, 0]]
  board[0][0] = 1

  return knightTourRecursive(board, moves) ? moves : []
}
