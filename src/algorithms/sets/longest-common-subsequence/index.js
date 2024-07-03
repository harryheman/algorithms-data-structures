export default function lcs(a, b) {
  // Инициализируем матрицу LCS
  const matrix = new Array(b.length + 1)
    .fill(null)
    .map(() => new Array(a.length + 1).fill(null))

  // Заполняем 0 первую строку
  for (let i = 0; i <= a.length; i++) {
    matrix[0][i] = 0
  }

  // Заполняем 0 первую колонку
  for (let i = 0; i <= b.length; i++) {
    matrix[i][0] = 0
  }

  // Заполняем матрицу LCS
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1])
      }
    }
  }

  // Вычисляем LCS на основе матрицы
  if (!matrix[b.length][a.length]) {
    return ['']
  }

  const lcs = []
  let i = a.length
  let j = b.length

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      // Двигаемся по диагонали "лево-верх"
      lcs.unshift(a[i - 1])
      i--
      j--
    } else if (matrix[j][i] === matrix[j][i - 1]) {
      // Двигаемся влево
      i--
    } else {
      // Двигаемся вверх
      j--
    }
  }

  return lcs
}
