export default function longestCommonSubstring(str1, str2) {
  const s1 = [...str1]
  const s2 = [...str2]

  const matrix = new Array(s2.length + 1)
    .fill(null)
    .map(() => new Array(s1.length + 1).fill(null))

  // Заполняем первую строку и первую колонку нулями
  for (let columnIndex = 0; columnIndex <= s1.length; columnIndex++) {
    matrix[0][columnIndex] = 0
  }
  for (let rowIndex = 0; rowIndex <= s2.length; rowIndex++) {
    matrix[rowIndex][0] = 0
  }

  let longestSubstringLength = 0
  let longestSubstringColumn = 0
  let longestSubstringRow = 0

  for (let rowIndex = 1; rowIndex <= s2.length; rowIndex++) {
    for (let columnIndex = 1; columnIndex <= s1.length; columnIndex++) {
      if (s1[columnIndex - 1] === s2[rowIndex - 1]) {
        matrix[rowIndex][columnIndex] =
          matrix[rowIndex - 1][columnIndex - 1] + 1
      } else {
        matrix[rowIndex][columnIndex] = 0
      }

      // Ищем наибольшую длину
      if (matrix[rowIndex][columnIndex] > longestSubstringLength) {
        longestSubstringLength = matrix[rowIndex][columnIndex]
        longestSubstringColumn = columnIndex
        longestSubstringRow = rowIndex
      }
    }
  }

  // Самая длинная подстрока не найдена
  if (longestSubstringLength === 0) {
    return ''
  }

  // Извлекаем самую длинную подстроку из матрицы
  let longestSubstring = ''

  while (matrix[longestSubstringRow][longestSubstringColumn] > 0) {
    longestSubstring = s1[longestSubstringColumn - 1] + longestSubstring
    longestSubstringColumn--
    longestSubstringRow--
  }

  return longestSubstring
}
