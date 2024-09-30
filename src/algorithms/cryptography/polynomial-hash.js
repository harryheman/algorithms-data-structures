const DEFAULT_BASE = 37
const DEFAULT_MODULUS = 101

export default class PolynomialHash {
  /**
   * @param {number} [base] - Базовое число, которое используется для создания полинома.
   * @param {number} [modulus] - Модульное число, которое защищает хэш от переполнения.
   */
  constructor({ base = DEFAULT_BASE, modulus = DEFAULT_MODULUS } = {}) {
    this.base = base
    this.modulus = modulus
  }

  /**
   * Функция, создающее хэшированное значение слова.
   *
   * Временная сложность: O(word.length).
   *
   * @param {string} word - Строка для хэширования.
   * @return {number}
   */
  hash(word) {
    const charCodes = Array.from(word).map((char) => this.charToNumber(char))

    let hash = 0
    for (let charIndex = 0; charIndex < charCodes.length; charIndex += 1) {
      hash *= this.base
      hash += charCodes[charIndex]
      hash %= this.modulus
    }

    return hash
  }

  /**
   * Функция, генерирующая хэш слова на основе
   * хэша предыдущего слова (сдвинутого на один символ влево).
   *
   * Повторно вычисляет хэш слова, чтобы не анализировать все слово заново.
   *
   * Временная сложность: O(1).
   *
   * @param {number} prevHash
   * @param {string} prevWord
   * @param {string} newWord
   * @return {number}
   */
  roll(prevHash, prevWord, newWord) {
    let hash = prevHash

    const prevValue = this.charToNumber(prevWord[0])
    const newValue = this.charToNumber(newWord[newWord.length - 1])

    let prevValueMultiplier = 1
    for (let i = 1; i < prevWord.length; i += 1) {
      prevValueMultiplier *= this.base
      prevValueMultiplier %= this.modulus
    }

    hash += this.modulus
    hash -= (prevValue * prevValueMultiplier) % this.modulus

    hash *= this.base
    hash += newValue
    hash %= this.modulus

    return hash
  }

  /**
   * Преобразует символ в число.
   *
   * @param {string} char
   * @return {number}
   */
  charToNumber(char) {
    let charCode = char.codePointAt(0)

    // Проверяем, является ли символ суррогатной парой.
    const surrogate = char.codePointAt(1)
    if (surrogate !== undefined) {
      const surrogateShift = 2 ** 16
      charCode += surrogate * surrogateShift
    }

    return charCode
  }
}
