export default function squareMatrixRotation(matrix) {
  // Выполняем верх-право/низ-лево диагональное отражение матрицы
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let colIndex = rowIndex + 1; colIndex < matrix.length; colIndex++) {
      ;[matrix[colIndex][rowIndex], matrix[rowIndex][colIndex]] = [
        matrix[rowIndex][colIndex],
        matrix[colIndex][rowIndex],
      ]
    }
  }

  // Выполняем горизонтальное отражение матрицы
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let colIndex = 0; colIndex < matrix.length / 2; colIndex++) {
      ;[
        matrix[rowIndex][matrix.length - 1 - colIndex],
        matrix[rowIndex][colIndex],
      ] = [
        matrix[rowIndex][colIndex],
        matrix[rowIndex][matrix.length - 1 - colIndex],
      ]
    }
  }

  return matrix
}
