export default function trialDivision(n) {
  // Проверяем, что число целое
  if (!Number.isInteger(n)) {
    return false
  }

  // Если число меньше 2, оно не простое по определению
  if (n < 2) {
    return false
  }

  // Числа 2 и 3 простые
  if (n <= 3) {
    return true
  }

  // Если число не делится на 2, мы можем исключить все дальнейшие четные делители
  if (n % 2 === 0) {
    return false
  }

  // Если до квадратного корня из `n` делителей нет, то нет и более высоких делителей
  const dividerLimit = Math.sqrt(n)
  for (let i = 3; i <= dividerLimit; i += 2) {
    if (n % i === 0) {
      return false
    }
  }

  return true
}
