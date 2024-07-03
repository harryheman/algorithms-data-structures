export default function levenshteinDistance(a, b) {
  // Создаем пустую матрицу редактирования
  const matrix = new Array(b.length + 1)
    .fill(null)
    .map(() => new Array(a.length + 1).fill(null))

  // Заполняем первую строку матрицы.
  // Если это первая строка, тогда мы преобразуем пустую строку в `a`.
  // В этом случае количество модификаций равняется размеру подстроки `a`
  for (let i = 0; i <= a.length; i++) {
    matrix[0][i] = i
  }

  // Заполняем первую колонку матрицы.
  // Если это первая колонка, тогда мы преобразуем пустую строку в `b`.
  // В этом случае количество модификаций равняется размеру подстроки `b`
  for (let j = 0; j <= b.length; j++) {
    matrix[j][0] = j
  }

  // Заполняем матрицу редактирования
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = b[j - 1] === a[i - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // удаление
        matrix[j - 1][i] + 1, // вставка
        matrix[j - 1][i - 1] + indicator, // замена
      )
    }
  }

  return matrix[b.length][a.length]
}
